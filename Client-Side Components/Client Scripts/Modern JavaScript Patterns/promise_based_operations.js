/**
 * Promise-Based Form Operations
 * 
 * This client script demonstrates promise-based patterns for form operations,
 * providing consistent error handling, better composability, and improved
 * code organization for complex form interactions.
 * 
 * Type: Client Script (onLoad, onChange, onSubmit)
 * Table: Any table
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Client Scripts/Promise Patterns
 */

/**
 * Promise-based form operation utilities
 */
class PromiseFormOperations {
    constructor() {
        this.operationQueue = [];
        this.isProcessing = false;
        this.defaultTimeout = 15000;
    }
    
    /**
     * Set field value with promise-based validation
     * @param {string} fieldName - Field name
     * @param {any} value - New value
     * @param {Object} options - Operation options
     * @returns {Promise} Promise resolving when operation completes
     */
    setValue(fieldName, value, options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const { validate = false, trigger = true, displayValue = false } = options;
                
                // Pre-validation if requested
                if (validate) {
                    const isValid = await this.validateFieldValue(fieldName, value);
                    if (!isValid.valid) {
                        reject(new Error(isValid.message));
                        return;
                    }
                }
                
                // Set the value
                if (displayValue) {
                    g_form.setDisplayValue(fieldName, value);
                } else {
                    g_form.setValue(fieldName, value, trigger);
                }
                
                // Wait for any triggered events to complete
                if (trigger) {
                    await this.waitForFieldUpdates(fieldName);
                }
                
                resolve({
                    field: fieldName,
                    value: value,
                    success: true
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Get field value with promise interface
     * @param {string} fieldName - Field name
     * @param {Object} options - Get options
     * @returns {Promise} Promise resolving to field value
     */
    getValue(fieldName, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                const { displayValue = false, reference = false } = options;
                
                let value;
                if (displayValue) {
                    value = g_form.getDisplayValue(fieldName);
                } else if (reference && g_form.isReferenceField(fieldName)) {
                    value = {
                        value: g_form.getValue(fieldName),
                        displayValue: g_form.getDisplayValue(fieldName),
                        tableName: g_form.getTableName(fieldName)
                    };
                } else {
                    value = g_form.getValue(fieldName);
                }
                
                resolve(value);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Submit form with comprehensive validation
     * @param {Object} options - Submit options
     * @returns {Promise} Promise resolving when submit completes
     */
    submitForm(options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const { validate = true, showProgress = true } = options;
                
                if (showProgress) {
                    this.showProgress('Submitting form...');
                }
                
                // Pre-submit validation
                if (validate) {
                    const validation = await this.validateAllFields();
                    if (!validation.valid) {
                        reject(new Error('Form validation failed: ' + validation.errors.join(', ')));
                        return;
                    }
                }
                
                // Attempt form submission
                const submitResult = await this.performSubmit();
                
                if (submitResult.success) {
                    resolve(submitResult);
                } else {
                    reject(new Error(submitResult.message || 'Form submission failed'));
                }
                
            } catch (error) {
                reject(error);
            } finally {
                if (options.showProgress) {
                    this.hideProgress();
                }
            }
        });
    }
    
    /**
     * Load related records with promise interface
     * @param {string} table - Table name
     * @param {Object} query - Query parameters
     * @param {Object} options - Load options
     * @returns {Promise} Promise resolving to records
     */
    loadRelatedRecords(table, query, options = {}) {
        return new Promise((resolve, reject) => {
            const { limit = 100, orderBy = 'sys_created_on' } = options;
            
            const ga = new GlideAjax('ClientScriptHelper');
            ga.addParam('sysparm_name', 'getRelatedRecords');
            ga.addParam('table', table);
            ga.addParam('query', JSON.stringify(query));
            ga.addParam('limit', limit);
            ga.addParam('orderBy', orderBy);
            
            const timeout = setTimeout(() => {
                reject(new Error('Request timeout'));
            }, this.defaultTimeout);
            
            ga.getXML((response) => {
                clearTimeout(timeout);
                
                try {
                    const answer = response.responseXML.documentElement.getAttribute('answer');
                    const result = JSON.parse(answer);
                    
                    if (result.error) {
                        reject(new Error(result.error));
                    } else {
                        resolve(result.records || []);
                    }
                } catch (error) {
                    reject(new Error('Failed to parse response: ' + error.message));
                }
            });
        });
    }
    
    /**
     * Update multiple fields atomically
     * @param {Object} fieldValues - Field name/value pairs
     * @param {Object} options - Update options
     * @returns {Promise} Promise resolving when all updates complete
     */
    updateMultipleFields(fieldValues, options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const { atomic = true, validate = false } = options;
                const updates = [];
                const rollbackValues = {};
                
                // Store current values for potential rollback
                if (atomic) {
                    for (const fieldName of Object.keys(fieldValues)) {
                        rollbackValues[fieldName] = await this.getValue(fieldName);
                    }
                }
                
                // Process all updates
                for (const [fieldName, value] of Object.entries(fieldValues)) {
                    try {
                        const updateResult = await this.setValue(fieldName, value, { 
                            validate, 
                            trigger: false // Prevent cascading during batch update
                        });
                        updates.push(updateResult);
                    } catch (error) {
                        if (atomic) {
                            // Rollback previous updates
                            await this.rollbackUpdates(rollbackValues);
                            reject(new Error(`Atomic update failed at ${fieldName}: ${error.message}`));
                            return;
                        } else {
                            console.warn(`Failed to update ${fieldName}: ${error.message}`);
                            updates.push({
                                field: fieldName,
                                value: value,
                                success: false,
                                error: error.message
                            });
                        }
                    }
                }
                
                // Trigger onChange events for all updated fields
                Object.keys(fieldValues).forEach(fieldName => {
                    if (g_form.isFieldVisible(fieldName)) {
                        g_form.fieldChanged(fieldName, true);
                    }
                });
                
                resolve({
                    updates: updates,
                    success: true,
                    totalUpdated: updates.filter(u => u.success).length
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Clear multiple fields with options
     * @param {Array} fieldNames - Fields to clear
     * @param {Object} options - Clear options
     * @returns {Promise} Promise resolving when clearing completes
     */
    clearFields(fieldNames, options = {}) {
        const clearValues = {};
        fieldNames.forEach(fieldName => {
            clearValues[fieldName] = '';
        });
        
        return this.updateMultipleFields(clearValues, options);
    }
    
    /**
     * Validate field value against business rules
     * @param {string} fieldName - Field name
     * @param {any} value - Value to validate
     * @returns {Promise} Promise resolving to validation result
     */
    validateFieldValue(fieldName, value) {
        return new Promise((resolve, reject) => {
            const ga = new GlideAjax('FieldValidationHelper');
            ga.addParam('sysparm_name', 'validateField');
            ga.addParam('table', g_form.getTableName());
            ga.addParam('field', fieldName);
            ga.addParam('value', value);
            ga.addParam('record_id', g_form.getUniqueValue());
            
            ga.getXML((response) => {
                try {
                    const answer = response.responseXML.documentElement.getAttribute('answer');
                    const result = JSON.parse(answer);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    
    /**
     * Validate all form fields
     * @returns {Promise} Promise resolving to overall validation result
     */
    validateAllFields() {
        return new Promise(async (resolve) => {
            const errors = [];
            const warnings = [];
            
            // Get all visible fields
            const fields = this.getVisibleFields();
            
            // Validate each field
            for (const fieldName of fields) {
                try {
                    const value = await this.getValue(fieldName);
                    const validation = await this.validateFieldValue(fieldName, value);
                    
                    if (!validation.valid) {
                        if (validation.severity === 'error') {
                            errors.push(`${fieldName}: ${validation.message}`);
                        } else {
                            warnings.push(`${fieldName}: ${validation.message}`);
                        }
                    }
                } catch (error) {
                    errors.push(`${fieldName}: Validation failed - ${error.message}`);
                }
            }
            
            resolve({
                valid: errors.length === 0,
                errors: errors,
                warnings: warnings
            });
        });
    }
    
    /**
     * Wait for field updates to complete
     * @param {string} fieldName - Field name
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise} Promise resolving when updates complete
     */
    waitForFieldUpdates(fieldName, timeout = 5000) {
        return new Promise((resolve) => {
            let checks = 0;
            const maxChecks = timeout / 100;
            
            const checkForUpdates = () => {
                checks++;
                
                // Check if any async operations are pending
                if (checks >= maxChecks || !this.hasOpenAjaxRequests()) {
                    resolve();
                } else {
                    setTimeout(checkForUpdates, 100);
                }
            };
            
            setTimeout(checkForUpdates, 100);
        });
    }
    
    /**
     * Perform actual form submission
     * @returns {Promise} Promise resolving to submit result
     * @private
     */
    performSubmit() {
        return new Promise((resolve) => {
            // Override the default submit action
            const originalAction = window.gsftSubmit;
            
            window.gsftSubmit = function(action) {
                // Restore original function
                window.gsftSubmit = originalAction;
                
                // Perform submission and resolve promise
                try {
                    const result = originalAction.call(this, action);
                    resolve({ success: true, result: result });
                } catch (error) {
                    resolve({ success: false, message: error.message });
                }
            };
            
            // Trigger form submission
            g_form.submit();
        });
    }
    
    /**
     * Rollback field updates
     * @param {Object} rollbackValues - Values to restore
     * @returns {Promise} Promise resolving when rollback completes
     * @private
     */
    async rollbackUpdates(rollbackValues) {
        for (const [fieldName, value] of Object.entries(rollbackValues)) {
            try {
                await this.setValue(fieldName, value, { validate: false, trigger: false });
            } catch (error) {
                console.error(`Failed to rollback ${fieldName}: ${error.message}`);
            }
        }
    }
    
    /**
     * Get all visible fields on the form
     * @returns {Array} Array of field names
     * @private
     */
    getVisibleFields() {
        const fields = [];
        const sections = g_form.getSections();
        
        sections.forEach(section => {
            const sectionFields = g_form.getSectionFields(section);
            sectionFields.forEach(field => {
                if (g_form.isFieldVisible(field)) {
                    fields.push(field);
                }
            });
        });
        
        return fields;
    }
    
    /**
     * Check if there are pending AJAX requests
     * @returns {boolean} True if requests are pending
     * @private
     */
    hasOpenAjaxRequests() {
        // Check ServiceNow's internal AJAX queue if available
        if (typeof CustomEvent !== 'undefined' && window.g_ajax_processors) {
            return Object.keys(window.g_ajax_processors).length > 0;
        }
        return false;
    }
    
    /**
     * Show progress indicator
     * @param {string} message - Progress message
     * @private
     */
    showProgress(message) {
        g_form.addInfoMessage(message);
    }
    
    /**
     * Hide progress indicator
     * @private
     */
    hideProgress() {
        g_form.clearMessages();
    }
}

// Create global instance
const promiseFormOps = new PromiseFormOperations();

/**
 * Promise-based field dependency manager
 */
class FieldDependencyManager {
    constructor() {
        this.dependencies = new Map();
        this.isProcessing = false;
    }
    
    /**
     * Add field dependency
     * @param {string} sourceField - Source field that triggers the dependency
     * @param {string} targetField - Target field that gets updated
     * @param {Function} calculator - Function to calculate new value
     * @param {Object} options - Dependency options
     */
    addDependency(sourceField, targetField, calculator, options = {}) {
        if (!this.dependencies.has(sourceField)) {
            this.dependencies.set(sourceField, []);
        }
        
        this.dependencies.get(sourceField).push({
            targetField,
            calculator,
            options
        });
    }
    
    /**
     * Process dependencies for a field change
     * @param {string} sourceField - Field that changed
     * @param {any} newValue - New value
     * @returns {Promise} Promise resolving when all dependencies processed
     */
    async processDependencies(sourceField, newValue) {
        if (this.isProcessing) {
            return; // Prevent recursive processing
        }
        
        this.isProcessing = true;
        
        try {
            const dependencies = this.dependencies.get(sourceField) || [];
            
            // Process dependencies in parallel
            const updates = await Promise.allSettled(
                dependencies.map(dep => this.processSingleDependency(dep, newValue))
            );
            
            // Report any failures
            const failures = updates.filter(result => result.status === 'rejected');
            if (failures.length > 0) {
                console.warn('Some dependency updates failed:', failures);
            }
            
        } finally {
            this.isProcessing = false;
        }
    }
    
    /**
     * Process single dependency
     * @param {Object} dependency - Dependency configuration
     * @param {any} sourceValue - Source field value
     * @returns {Promise} Promise resolving when dependency processed
     * @private
     */
    async processSingleDependency(dependency, sourceValue) {
        const { targetField, calculator, options } = dependency;
        const { condition, delay = 0 } = options;
        
        // Check condition if specified
        if (condition && !condition(sourceValue)) {
            return;
        }
        
        // Add delay if specified
        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        // Calculate new value
        const newValue = await calculator(sourceValue, targetField);
        
        // Update target field
        if (newValue !== undefined) {
            await promiseFormOps.setValue(targetField, newValue);
        }
    }
}

// Create global dependency manager
const dependencyManager = new FieldDependencyManager();

/**
 * Promise-based onChange handler example
 */
async function promiseOnChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || isTemplate || newValue === oldValue) {
        return;
    }
    
    const fieldName = control.name;
    
    try {
        // Process field dependencies
        await dependencyManager.processDependencies(fieldName, newValue);
        
        // Handle specific field logic
        switch (fieldName) {
            case 'priority':
                await handlePriorityChange(newValue);
                break;
            case 'category':
                await handleCategoryChange(newValue);
                break;
            case 'caller_id':
                await handleCallerChange(newValue);
                break;
        }
        
    } catch (error) {
        console.error(`Promise-based onChange failed for ${fieldName}:`, error);
        g_form.addErrorMessage(`Failed to process ${fieldName} change: ${error.message}`);
    }
}

/**
 * Handle priority change with promise pattern
 * @param {string} priority - New priority value
 * @returns {Promise} Promise resolving when handling completes
 */
async function handlePriorityChange(priority) {
    const updates = {};
    
    // Set urgency based on priority
    const urgencyMap = { '1': '1', '2': '2', '3': '3', '4': '3', '5': '3' };
    updates.urgency = urgencyMap[priority] || '3';
    
    // Update impact if priority is critical
    if (priority === '1') {
        updates.impact = '1';
        updates.u_escalated = 'true';
    }
    
    await promiseFormOps.updateMultipleFields(updates);
}

/**
 * Handle category change with promise pattern
 * @param {string} category - New category value
 * @returns {Promise} Promise resolving when handling completes
 */
async function handleCategoryChange(category) {
    if (!category) {
        await promiseFormOps.clearFields(['subcategory', 'assignment_group']);
        return;
    }
    
    try {
        // Load category data
        const categoryData = await promiseFormOps.loadRelatedRecords('incident_category', {
            name: category
        });
        
        if (categoryData.length > 0) {
            const cat = categoryData[0];
            const updates = {};
            
            if (cat.default_assignment_group) {
                updates.assignment_group = cat.default_assignment_group;
            }
            
            if (cat.default_priority) {
                updates.priority = cat.default_priority;
            }
            
            await promiseFormOps.updateMultipleFields(updates);
        }
        
    } catch (error) {
        console.error('Failed to load category data:', error);
    }
}

/**
 * Promise-based onSubmit handler
 */
async function promiseOnSubmit() {
    try {
        // Perform comprehensive form validation
        const validation = await promiseFormOps.validateAllFields();
        
        if (!validation.valid) {
            g_form.addErrorMessage('Please correct the following errors:\n' + 
                                 validation.errors.join('\n'));
            return false;
        }
        
        // Show warnings if any
        if (validation.warnings.length > 0) {
            g_form.addWarningMessage('Please review:\n' + 
                                   validation.warnings.join('\n'));
        }
        
        // Additional business logic validation
        const businessValidation = await validateBusinessRules();
        
        if (!businessValidation.valid) {
            g_form.addErrorMessage(businessValidation.message);
            return false;
        }
        
        return true;
        
    } catch (error) {
        console.error('Form submission validation failed:', error);
        g_form.addErrorMessage('Validation failed: ' + error.message);
        return false;
    }
}

/**
 * Validate business rules before submission
 * @returns {Promise} Promise resolving to validation result
 */
async function validateBusinessRules() {
    const priority = await promiseFormOps.getValue('priority');
    const category = await promiseFormOps.getValue('category');
    const assignmentGroup = await promiseFormOps.getValue('assignment_group');
    
    // Example business rule: High priority incidents must have assignment group
    if ((priority === '1' || priority === '2') && !assignmentGroup) {
        return {
            valid: false,
            message: 'High priority incidents must have an assignment group'
        };
    }
    
    // Example business rule: Certain categories require approval
    const approvalRequiredCategories = ['security', 'data_breach'];
    if (approvalRequiredCategories.includes(category)) {
        const approval = await promiseFormOps.getValue('u_approval_status');
        if (!approval || approval === 'pending') {
            return {
                valid: false,
                message: 'This category requires approval before submission'
            };
        }
    }
    
    return { valid: true };
}

/**
 * Setup field dependencies on form load
 */
function setupPromiseBasedDependencies() {
    // Priority affects urgency
    dependencyManager.addDependency('priority', 'urgency', async (priority) => {
        const urgencyMap = { '1': '1', '2': '2', '3': '3', '4': '3', '5': '3' };
        return urgencyMap[priority] || '3';
    });
    
    // Category affects assignment group
    dependencyManager.addDependency('category', 'assignment_group', async (category) => {
        if (!category) return '';
        
        const categoryData = await promiseFormOps.loadRelatedRecords('incident_category', {
            name: category
        });
        
        return categoryData.length > 0 ? categoryData[0].default_assignment_group : '';
    });
    
    // Caller affects location and company
    dependencyManager.addDependency('caller_id', 'location', async (callerId) => {
        if (!callerId) return '';
        
        const userData = await promiseFormOps.loadRelatedRecords('sys_user', {
            sys_id: callerId
        });
        
        return userData.length > 0 ? userData[0].location : '';
    });
}
