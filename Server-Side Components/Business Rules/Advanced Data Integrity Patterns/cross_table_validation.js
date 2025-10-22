/**
 * Cross-Table Data Validation Business Rule
 * 
 * This business rule provides comprehensive validation across multiple tables
 * to ensure referential integrity and business rule compliance.
 * 
 * Table: Any table requiring cross-table validation
 * When: before insert, before update
 * Order: 100 (run early for validation)
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Data Integrity/Validation
 */

(function executeRule(current, previous) {
    
    // Initialize the validation engine
    var validator = new CrossTableValidator(current, previous);
    
    // Configure validation rules based on table
    validator.configureValidation();
    
    // Execute validation
    var validationResult = validator.validate();
    
    if (!validationResult.isValid) {
        gs.addErrorMessage(validationResult.errorMessage);
        current.setAbortAction(true);
    }
    
})(current, previous);

/**
 * Cross-Table Validation Engine
 */
var CrossTableValidator = Class.create();
CrossTableValidator.prototype = {
    
    initialize: function(current, previous) {
        this.current = current;
        this.previous = previous;
        this.tableName = current.getTableName();
        this.validationRules = [];
        this.errors = [];
        this.warnings = [];
        this.context = {
            operation: this._getOperation(),
            user: gs.getUserID(),
            session: gs.getSessionID(),
            timestamp: new GlideDateTime()
        };
    },
    
    /**
     * Configure validation rules based on table and business requirements
     */
    configureValidation: function() {
        
        // Common validation rules for all tables
        this._addCommonValidationRules();
        
        // Table-specific validation rules
        switch (this.tableName) {
            case 'incident':
                this._configureIncidentValidation();
                break;
            case 'change_request':
                this._configureChangeValidation();
                break;
            case 'sc_request':
                this._configureRequestValidation();
                break;
            case 'problem':
                this._configureProblemValidation();
                break;
            case 'cmdb_ci':
                this._configureCIValidation();
                break;
            default:
                this._configureGenericValidation();
                break;
        }
        
        // Load custom validation rules from configuration
        this._loadCustomValidationRules();
    },
    
    /**
     * Execute all configured validation rules
     * @returns {Object} Validation result
     */
    validate: function() {
        var startTime = new GlideDateTime().getNumericValue();
        
        try {
            for (var i = 0; i < this.validationRules.length; i++) {
                var rule = this.validationRules[i];
                
                // Check if rule applies to current operation
                if (this._ruleApplies(rule)) {
                    var ruleResult = this._executeValidationRule(rule);
                    
                    if (!ruleResult.passed) {
                        if (rule.severity === 'error') {
                            this.errors.push({
                                rule: rule.name,
                                message: ruleResult.message,
                                field: rule.field,
                                severity: rule.severity
                            });
                        } else {
                            this.warnings.push({
                                rule: rule.name,
                                message: ruleResult.message,
                                field: rule.field,
                                severity: rule.severity
                            });
                        }
                    }
                }
            }
            
            // Log validation metrics
            var endTime = new GlideDateTime().getNumericValue();
            this._logValidationMetrics(endTime - startTime);
            
            return {
                isValid: this.errors.length === 0,
                errorMessage: this._formatErrorMessage(),
                warnings: this.warnings,
                errors: this.errors
            };
            
        } catch (e) {
            gs.error('CrossTableValidator: Validation failed with exception: ' + e.message);
            return {
                isValid: false,
                errorMessage: 'Validation system error. Please contact administrator.',
                errors: [{ message: e.message, severity: 'error' }]
            };
        }
    },
    
    /**
     * Add common validation rules applicable to all tables
     * @private
     */
    _addCommonValidationRules: function() {
        
        // User access validation
        this.validationRules.push({
            name: 'user_access_validation',
            description: 'Validate user has required access',
            field: '*',
            severity: 'error',
            operations: ['insert', 'update'],
            validator: function(current, previous, context) {
                // Check if user has required roles for the operation
                var requiredRoles = current.getElement('sys_class_name').getED().getAttributeValue('required_roles');
                
                if (requiredRoles) {
                    var rolesArray = requiredRoles.split(',');
                    for (var i = 0; i < rolesArray.length; i++) {
                        if (!gs.hasRole(rolesArray[i].trim())) {
                            return {
                                passed: false,
                                message: 'Insufficient privileges to perform this operation'
                            };
                        }
                    }
                }
                
                return { passed: true };
            }
        });
        
        // Data format validation
        this.validationRules.push({
            name: 'data_format_validation',
            description: 'Validate data formats and patterns',
            field: '*',
            severity: 'error',
            operations: ['insert', 'update'],
            validator: function(current, previous, context) {
                var formatErrors = [];
                
                // Email format validation
                var emailFields = ['email', 'u_email', 'contact_email'];
                for (var i = 0; i < emailFields.length; i++) {
                    var fieldName = emailFields[i];
                    if (current.isValidField(fieldName)) {
                        var emailValue = current.getValue(fieldName);
                        if (emailValue && !this._isValidEmail(emailValue)) {
                            formatErrors.push('Invalid email format in field: ' + fieldName);
                        }
                    }
                }
                
                // Phone format validation
                var phoneFields = ['phone', 'mobile_phone', 'business_phone'];
                for (var j = 0; j < phoneFields.length; j++) {
                    var phoneField = phoneFields[j];
                    if (current.isValidField(phoneField)) {
                        var phoneValue = current.getValue(phoneField);
                        if (phoneValue && !this._isValidPhone(phoneValue)) {
                            formatErrors.push('Invalid phone format in field: ' + phoneField);
                        }
                    }
                }
                
                if (formatErrors.length > 0) {
                    return {
                        passed: false,
                        message: formatErrors.join('; ')
                    };
                }
                
                return { passed: true };
            }.bind(this)
        });
        
        // Required field validation
        this.validationRules.push({
            name: 'required_field_validation',
            description: 'Validate required fields based on business rules',
            field: '*',
            severity: 'error',
            operations: ['insert', 'update'],
            validator: function(current, previous, context) {
                var requiredFields = this._getRequiredFields(current);
                var missingFields = [];
                
                for (var i = 0; i < requiredFields.length; i++) {
                    var field = requiredFields[i];
                    if (this._isFieldEmpty(current.getValue(field.name))) {
                        missingFields.push(field.label || field.name);
                    }
                }
                
                if (missingFields.length > 0) {
                    return {
                        passed: false,
                        message: 'Required fields missing: ' + missingFields.join(', ')
                    };
                }
                
                return { passed: true };
            }.bind(this)
        });
    },
    
    /**
     * Configure incident-specific validation rules
     * @private
     */
    _configureIncidentValidation: function() {
        
        // Assignment group validation
        this.validationRules.push({
            name: 'incident_assignment_validation',
            description: 'Validate incident assignment group and assigned to',
            field: 'assignment_group',
            severity: 'error',
            operations: ['insert', 'update'],
            validator: function(current, previous, context) {
                var assignmentGroup = current.getValue('assignment_group');
                var assignedTo = current.getValue('assigned_to');
                
                if (assignmentGroup && assignedTo) {
                    // Check if assigned user is member of assignment group
                    var userGr = new GlideRecord('sys_user_grmember');
                    userGr.addQuery('user', assignedTo);
                    userGr.addQuery('group', assignmentGroup);
                    userGr.query();
                    
                    if (!userGr.hasNext()) {
                        return {
                            passed: false,
                            message: 'Assigned user must be a member of the assignment group'
                        };
                    }
                }
                
                return { passed: true };
            }
        });
        
        // CI validation for incidents
        this.validationRules.push({
            name: 'incident_ci_validation',
            description: 'Validate Configuration Item relationship',
            field: 'cmdb_ci',
            severity: 'warning',
            operations: ['insert', 'update'],
            validator: function(current, previous, context) {
                var ciSysId = current.getValue('cmdb_ci');
                var callerCompany = current.caller_id.company.toString();
                
                if (ciSysId) {
                    var ciGr = new GlideRecord('cmdb_ci');
                    if (ciGr.get(ciSysId)) {
                        var ciCompany = ciGr.getValue('company');
                        
                        if (ciCompany && callerCompany && ciCompany !== callerCompany) {
                            return {
                                passed: false,
                                message: 'Configuration Item belongs to different company than caller'
                            };
                        }
                    }
                }
                
                return { passed: true };
            }
        });
    },
    
    /**
     * Configure change request validation rules
     * @private
     */
    _configureChangeValidation: function() {
        
        // Change collision validation
        this.validationRules.push({
            name: 'change_collision_validation',
            description: 'Validate change request scheduling conflicts',
            field: 'start_date',
            severity: 'error',
            operations: ['insert', 'update'],
            validator: function(current, previous, context) {
                var startDate = current.getValue('start_date');
                var endDate = current.getValue('end_date');
                var affectedCIs = current.getValue('cmdb_ci');
                
                if (startDate && endDate && affectedCIs) {
                    // Check for overlapping changes on the same CI
                    var changeGr = new GlideRecord('change_request');
                    changeGr.addQuery('cmdb_ci', affectedCIs);
                    changeGr.addQuery('state', 'NOT IN', 'closed,cancelled');
                    changeGr.addQuery('sys_id', '!=', current.sys_id);
                    
                    // Date overlap query
                    changeGr.addQuery('start_date', '<=', endDate);
                    changeGr.addQuery('end_date', '>=', startDate);
                    changeGr.query();
                    
                    if (changeGr.hasNext()) {
                        return {
                            passed: false,
                            message: 'Change request conflicts with existing change: ' + changeGr.number
                        };
                    }
                }
                
                return { passed: true };
            }
        });
        
        // Risk assessment validation
        this.validationRules.push({
            name: 'change_risk_validation',
            description: 'Validate risk assessment completion',
            field: 'risk',
            severity: 'error',
            operations: ['update'],
            validator: function(current, previous, context) {
                var state = current.getValue('state');
                var risk = current.getValue('risk');
                var impact = current.getValue('impact');
                
                // Risk assessment required before implementation
                if (state === 'implement' && (!risk || risk === '')) {
                    return {
                        passed: false,
                        message: 'Risk assessment must be completed before implementation'
                    };
                }
                
                // High risk changes require additional approval
                if (risk === '1' && impact === '1') {
                    var approvalGr = new GlideRecord('sysapproval_approver');
                    approvalGr.addQuery('source_table', 'change_request');
                    approvalGr.addQuery('source_id', current.sys_id);
                    approvalGr.addQuery('state', 'approved');
                    approvalGr.query();
                    
                    if (!approvalGr.hasNext()) {
                        return {
                            passed: false,
                            message: 'High risk/high impact changes require approval'
                        };
                    }
                }
                
                return { passed: true };
            }
        });
    },
    
    /**
     * Execute individual validation rule
     * @param {Object} rule - Validation rule object
     * @returns {Object} Rule execution result
     * @private
     */
    _executeValidationRule: function(rule) {
        try {
            return rule.validator(this.current, this.previous, this.context);
        } catch (e) {
            gs.error('CrossTableValidator: Rule execution failed for ' + rule.name + ': ' + e.message);
            return {
                passed: false,
                message: 'Validation rule error: ' + rule.name
            };
        }
    },
    
    /**
     * Check if validation rule applies to current operation
     * @param {Object} rule - Validation rule
     * @returns {boolean} True if rule applies
     * @private
     */
    _ruleApplies: function(rule) {
        if (!rule.operations || rule.operations.length === 0) {
            return true;
        }
        
        return rule.operations.indexOf(this.context.operation) !== -1;
    },
    
    /**
     * Get current operation type
     * @returns {string} Operation type
     * @private
     */
    _getOperation: function() {
        if (this.current.isNewRecord()) {
            return 'insert';
        } else {
            return 'update';
        }
    },
    
    /**
     * Format error message for user display
     * @returns {string} Formatted error message
     * @private
     */
    _formatErrorMessage: function() {
        if (this.errors.length === 0) {
            return '';
        }
        
        var errorMessages = [];
        for (var i = 0; i < this.errors.length; i++) {
            errorMessages.push(this.errors[i].message);
        }
        
        return 'Validation failed: ' + errorMessages.join('; ');
    },
    
    /**
     * Validate email format
     * @param {string} email - Email address
     * @returns {boolean} True if valid
     * @private
     */
    _isValidEmail: function(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Validate phone format
     * @param {string} phone - Phone number
     * @returns {boolean} True if valid
     * @private
     */
    _isValidPhone: function(phone) {
        var phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },
    
    /**
     * Get required fields for current record
     * @param {GlideRecord} record - Current record
     * @returns {Array} Array of required field objects
     * @private
     */
    _getRequiredFields: function(record) {
        var requiredFields = [];
        
        // Get fields marked as mandatory in dictionary
        var fieldGr = new GlideRecord('sys_dictionary');
        fieldGr.addQuery('name', record.getTableName());
        fieldGr.addQuery('mandatory', true);
        fieldGr.query();
        
        while (fieldGr.next()) {
            requiredFields.push({
                name: fieldGr.element.toString(),
                label: fieldGr.column_label.toString()
            });
        }
        
        return requiredFields;
    },
    
    /**
     * Check if field value is empty
     * @param {string} value - Field value
     * @returns {boolean} True if empty
     * @private
     */
    _isFieldEmpty: function(value) {
        return !value || value.toString().trim() === '';
    },
    
    /**
     * Log validation metrics for monitoring
     * @param {number} executionTime - Execution time in milliseconds
     * @private
     */
    _logValidationMetrics: function(executionTime) {
        gs.info('CrossTableValidator: Validation completed for ' + this.tableName + 
               ' in ' + executionTime + 'ms, ' + 
               this.errors.length + ' errors, ' + 
               this.warnings.length + ' warnings');
    },
    
    type: 'CrossTableValidator'
};
