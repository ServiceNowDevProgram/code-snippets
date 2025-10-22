/**
 * Conditional Field Dependencies Business Rule
 * 
 * This business rule implements complex conditional field dependency logic,
 * including dynamic required fields, field visibility, and cascading updates
 * based on business rules and field relationships.
 * 
 * Table: Any table requiring conditional field logic
 * When: before insert, before update, after insert, after update  
 * Order: 150
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Data Integrity/Field Dependencies
 */

(function executeRule(current, previous) {
    
    // Initialize the field dependency manager
    var dependencyManager = new ConditionalFieldManager(current, previous);
    
    // Configure field dependencies based on table
    dependencyManager.configureDependencies();
    
    // Process field dependencies
    dependencyManager.processDependencies();
    
})(current, previous);

/**
 * Conditional Field Dependency Manager
 */
var ConditionalFieldManager = Class.create();
ConditionalFieldManager.prototype = {
    
    initialize: function(current, previous) {
        this.current = current;
        this.previous = previous;
        this.tableName = current.getTableName();
        this.dependencies = [];
        this.fieldStates = {};
        this.validationErrors = [];
        
        this.context = {
            operation: this._getOperation(),
            user: gs.getUserID(),
            userRoles: this._getUserRoles(),
            timestamp: new GlideDateTime()
        };
    },
    
    /**
     * Configure field dependencies based on table and business rules
     */
    configureDependencies: function() {
        
        // Load table-specific dependencies
        this._loadTableDependencies();
        
        // Load custom configuration dependencies
        this._loadCustomDependencies();
        
        // Load role-based dependencies
        this._loadRoleBasedDependencies();
        
        // Sort dependencies by priority
        this.dependencies.sort(function(a, b) {
            return (a.priority || 100) - (b.priority || 100);
        });
    },
    
    /**
     * Process all field dependencies
     */
    processDependencies: function() {
        try {
            var operation = this.context.operation;
            
            // Process dependencies based on operation
            if (operation.startsWith('before_')) {
                this._validateConditionalRequiredFields();
                this._processBeforeDependencies();
            } else {
                this._processAfterDependencies();
            }
            
            // Apply validation errors if any
            if (this.validationErrors.length > 0 && operation.startsWith('before_')) {
                this._applyValidationErrors();
            }
            
        } catch (e) {
            gs.error('ConditionalFieldManager: Error processing dependencies: ' + e.message);
            if (this.context.operation.startsWith('before_')) {
                this.current.setAbortAction(true);
                gs.addErrorMessage('Field dependency validation failed: ' + e.message);
            }
        }
    },
    
    /**
     * Load table-specific dependencies
     * @private
     */
    _loadTableDependencies: function() {
        
        switch (this.tableName) {
            case 'incident':
                this._loadIncidentDependencies();
                break;
            case 'change_request':
                this._loadChangeDependencies();
                break;
            case 'sc_request':
                this._loadRequestDependencies();
                break;
            case 'hr_case':
                this._loadHRCaseDependencies();
                break;
            case 'cmdb_ci':
                this._loadCIDependencies();
                break;
            default:
                this._loadGenericDependencies();
                break;
        }
    },
    
    /**
     * Load incident-specific field dependencies
     * @private
     */
    _loadIncidentDependencies: function() {
        
        // Category and subcategory dependency
        this.dependencies.push({
            name: 'category_subcategory_dependency',
            triggerField: 'category',
            action: 'cascade_clear',
            targetFields: ['subcategory'],
            condition: function(current, previous, context) {
                return current.getValue('category') !== (previous ? previous.getValue('category') : '');
            },
            processor: function(current, targetFields, context) {
                // Clear subcategory when category changes
                current.setValue('subcategory', '');
                
                // Set subcategory as required if category is set
                var category = current.getValue('category');
                if (category) {
                    context.manager._setFieldRequired('subcategory', true);
                }
            }
        });
        
        // Assignment based on category
        this.dependencies.push({
            name: 'category_assignment_dependency',
            triggerField: 'category',
            action: 'auto_assign',
            targetFields: ['assignment_group'],
            condition: function(current, previous, context) {
                var category = current.getValue('category');
                return category && !current.getValue('assignment_group');
            },
            processor: function(current, targetFields, context) {
                var category = current.getValue('category');
                var assignmentGroup = context.manager._getDefaultAssignmentGroup(category);
                
                if (assignmentGroup) {
                    current.setValue('assignment_group', assignmentGroup);
                }
            }
        });
        
        // VIP caller special handling
        this.dependencies.push({
            name: 'vip_caller_dependency',
            triggerField: 'caller_id',
            action: 'conditional_requirements',
            targetFields: ['priority', 'impact'],
            condition: function(current, previous, context) {
                var callerId = current.getValue('caller_id');
                return callerId && context.manager._isVIPUser(callerId);
            },
            processor: function(current, targetFields, context) {
                // VIP callers require high impact and priority consideration
                var impact = current.getValue('impact');
                var priority = current.getValue('priority');
                
                if (!impact || parseInt(impact) > 2) {
                    current.setValue('impact', '2'); // High impact
                }
                
                if (!priority || parseInt(priority) > 2) {
                    current.setValue('priority', '2'); // High priority
                }
                
                // Make business justification required for VIP incidents
                context.manager._setFieldRequired('business_justification', true);
            }
        });
        
        // Resolution fields dependency
        this.dependencies.push({
            name: 'resolution_dependency',
            triggerField: 'state',
            action: 'conditional_requirements',
            targetFields: ['close_code', 'close_notes'],
            condition: function(current, previous, context) {
                var state = current.getValue('state');
                return state === '6' || state === '7'; // Resolved or Closed
            },
            processor: function(current, targetFields, context) {
                context.manager._setFieldRequired('close_code', true);
                context.manager._setFieldRequired('close_notes', true);
                
                var closeCode = current.getValue('close_code');
                var closeNotes = current.getValue('close_notes');
                
                if (!closeCode) {
                    context.manager._addValidationError('Close code is required when resolving/closing incident');
                }
                
                if (!closeNotes || closeNotes.trim().length < 10) {
                    context.manager._addValidationError('Close notes must be at least 10 characters when resolving/closing incident');
                }
            }
        });
    },
    
    /**
     * Load change request dependencies
     * @private
     */
    _loadChangeDependencies: function() {
        
        // Change type and risk assessment
        this.dependencies.push({
            name: 'change_type_risk_dependency',
            triggerField: 'type',
            action: 'conditional_requirements',
            targetFields: ['risk_impact_analysis', 'test_plan'],
            condition: function(current, previous, context) {
                var type = current.getValue('type');
                return type === 'standard' || type === 'major';
            },
            processor: function(current, targetFields, context) {
                var type = current.getValue('type');
                
                if (type === 'major') {
                    context.manager._setFieldRequired('risk_impact_analysis', true);
                    context.manager._setFieldRequired('test_plan', true);
                    context.manager._setFieldRequired('backout_plan', true);
                }
                
                if (type === 'standard') {
                    context.manager._setFieldRequired('test_plan', true);
                }
            }
        });
        
        // Implementation state requirements
        this.dependencies.push({
            name: 'implementation_dependency',
            triggerField: 'state',
            action: 'conditional_requirements',
            targetFields: ['work_start', 'work_end'],
            condition: function(current, previous, context) {
                var state = current.getValue('state');
                return state === 'implement';
            },
            processor: function(current, targetFields, context) {
                context.manager._setFieldRequired('work_start', true);
                
                var workStart = current.getValue('work_start');
                if (workStart) {
                    var now = new GlideDateTime();
                    var startTime = new GlideDateTime(workStart);
                    
                    if (startTime.before(now)) {
                        context.manager._addValidationError('Work start time cannot be in the past');
                    }
                }
            }
        });
    },
    
    /**
     * Load HR case dependencies
     * @private
     */
    _loadHRCaseDependencies: function() {
        
        // HR category specific requirements
        this.dependencies.push({
            name: 'hr_category_dependency',
            triggerField: 'hr_service',
            action: 'conditional_requirements',
            targetFields: ['employee_id', 'manager_approval'],
            condition: function(current, previous, context) {
                var hrService = current.getValue('hr_service');
                return hrService;
            },
            processor: function(current, targetFields, context) {
                var hrService = current.getValue('hr_service');
                var hrServiceGr = new GlideRecord('hr_service');
                
                if (hrServiceGr.get(hrService)) {
                    var requiresManagerApproval = hrServiceGr.getValue('requires_manager_approval');
                    var requiresEmployee = hrServiceGr.getValue('requires_employee_id');
                    
                    if (requiresEmployee === 'true') {
                        context.manager._setFieldRequired('employee_id', true);
                    }
                    
                    if (requiresManagerApproval === 'true') {
                        context.manager._setFieldRequired('manager_approval', true);
                    }
                }
            }
        });
    },
    
    /**
     * Process before-operation dependencies
     * @private
     */
    _processBeforeDependencies: function() {
        for (var i = 0; i < this.dependencies.length; i++) {
            var dependency = this.dependencies[i];
            
            // Check if dependency condition is met
            if (this._isDependencyTriggered(dependency)) {
                try {
                    dependency.processor(this.current, dependency.targetFields, {
                        manager: this,
                        context: this.context
                    });
                } catch (e) {
                    gs.error('ConditionalFieldManager: Error processing dependency ' + 
                           dependency.name + ': ' + e.message);
                }
            }
        }
    },
    
    /**
     * Process after-operation dependencies
     * @private
     */
    _processAfterDependencies: function() {
        // After operations typically involve updating related records
        // or triggering external processes
        
        for (var i = 0; i < this.dependencies.length; i++) {
            var dependency = this.dependencies[i];
            
            if (dependency.action === 'update_related' && this._isDependencyTriggered(dependency)) {
                this._processRelatedRecordUpdates(dependency);
            }
        }
    },
    
    /**
     * Validate conditional required fields
     * @private
     */
    _validateConditionalRequiredFields: function() {
        // Check all fields marked as conditionally required
        for (var fieldName in this.fieldStates) {
            var fieldState = this.fieldStates[fieldName];
            
            if (fieldState.required) {
                var fieldValue = this.current.getValue(fieldName);
                
                if (!fieldValue || fieldValue.toString().trim() === '') {
                    var fieldLabel = this._getFieldLabel(fieldName);
                    this._addValidationError(fieldLabel + ' is required');
                }
            }
        }
    },
    
    /**
     * Check if dependency is triggered
     * @param {Object} dependency - Dependency configuration
     * @returns {boolean} True if triggered
     * @private
     */
    _isDependencyTriggered: function(dependency) {
        if (dependency.condition) {
            return dependency.condition(this.current, this.previous, this.context);
        }
        
        // Default trigger: check if trigger field has changed
        var triggerField = dependency.triggerField;
        if (triggerField) {
            var currentValue = this.current.getValue(triggerField);
            var previousValue = this.previous ? this.previous.getValue(triggerField) : '';
            
            return currentValue !== previousValue;
        }
        
        return false;
    },
    
    /**
     * Set field as required
     * @param {string} fieldName - Field name
     * @param {boolean} required - Required state
     * @private
     */
    _setFieldRequired: function(fieldName, required) {
        if (!this.fieldStates[fieldName]) {
            this.fieldStates[fieldName] = {};
        }
        
        this.fieldStates[fieldName].required = required;
    },
    
    /**
     * Add validation error
     * @param {string} message - Error message
     * @private
     */
    _addValidationError: function(message) {
        this.validationErrors.push(message);
    },
    
    /**
     * Apply validation errors to current record
     * @private
     */
    _applyValidationErrors: function() {
        if (this.validationErrors.length > 0) {
            var errorMessage = this.validationErrors.join('; ');
            gs.addErrorMessage(errorMessage);
            this.current.setAbortAction(true);
        }
    },
    
    /**
     * Get default assignment group for category
     * @param {string} category - Incident category
     * @returns {string} Assignment group sys_id
     * @private
     */
    _getDefaultAssignmentGroup: function(category) {
        var categoryGr = new GlideRecord('incident_category');
        categoryGr.addQuery('name', category);
        categoryGr.query();
        
        if (categoryGr.next()) {
            return categoryGr.getValue('default_assignment_group');
        }
        
        return null;
    },
    
    /**
     * Check if user is VIP
     * @param {string} userId - User sys_id
     * @returns {boolean} True if VIP user
     * @private
     */
    _isVIPUser: function(userId) {
        var userGr = new GlideRecord('sys_user');
        if (userGr.get(userId)) {
            return userGr.getValue('vip') === 'true';
        }
        
        return false;
    },
    
    /**
     * Get field label
     * @param {string} fieldName - Field name
     * @returns {string} Field label
     * @private
     */
    _getFieldLabel: function(fieldName) {
        var fieldGr = new GlideRecord('sys_dictionary');
        fieldGr.addQuery('name', this.tableName);
        fieldGr.addQuery('element', fieldName);
        fieldGr.query();
        
        if (fieldGr.next()) {
            return fieldGr.getValue('column_label') || fieldName;
        }
        
        return fieldName;
    },
    
    /**
     * Get current operation type
     * @returns {string} Operation type
     * @private
     */
    _getOperation: function() {
        if (this.current.isNewRecord()) {
            return 'before_insert';
        } else {
            return 'before_update';
        }
    },
    
    /**
     * Get user roles
     * @returns {Array} Array of user roles
     * @private
     */
    _getUserRoles: function() {
        var roles = [];
        var roleGr = new GlideRecord('sys_user_has_role');
        roleGr.addQuery('user', gs.getUserID());
        roleGr.query();
        
        while (roleGr.next()) {
            roles.push(roleGr.role.name.toString());
        }
        
        return roles;
    },
    
    /**
     * Load custom dependencies from configuration table
     * @private
     */
    _loadCustomDependencies: function() {
        // Implementation would load from a custom configuration table
        // This is a placeholder for custom dependency loading
        gs.info('ConditionalFieldManager: Loading custom dependencies for ' + this.tableName);
    },
    
    /**
     * Load role-based dependencies
     * @private
     */
    _loadRoleBasedDependencies: function() {
        // Implementation would load role-specific field requirements
        // This is a placeholder for role-based dependency loading
        gs.info('ConditionalFieldManager: Loading role-based dependencies for user roles: ' + 
               this.context.userRoles.join(', '));
    },
    
    type: 'ConditionalFieldManager'
};
