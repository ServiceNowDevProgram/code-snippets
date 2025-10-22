/**
 * ES6+ Form Field Management Patterns
 * 
 * This client script demonstrates modern ES6+ JavaScript features for
 * form field management, including destructuring, template literals,
 * arrow functions, and class-based field controllers.
 * 
 * Type: Client Script (All types)
 * Table: Any table
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Client Scripts/ES6+ Patterns
 */

/**
 * Modern form field controller using ES6+ features
 */
class FormFieldController {
    constructor(formRef = g_form) {
        this.form = formRef;
        this.fieldStates = new Map();
        this.validators = new Map();
        this.watchers = new Map();
        this.cache = new Map();
        
        // Bind methods to preserve context
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    
    /**
     * Initialize field controller with configuration
     * @param {Object} config - Controller configuration
     */
    initialize(config = {}) {
        const {
            autoValidation = true,
            cacheEnabled = true,
            debugMode = false
        } = config;
        
        this.config = { autoValidation, cacheEnabled, debugMode };
        
        if (debugMode) {
            console.log('FormFieldController initialized with config:', config);
        }
    }
    
    /**
     * Set field value with ES6+ features
     * @param {string} fieldName - Field name
     * @param {any} value - Field value
     * @param {Object} options - Set options
     * @returns {Object} Operation result
     */
    setFieldValue(fieldName, value, options = {}) {
        const {
            displayValue = false,
            triggerEvents = true,
            validate = false,
            metadata = {}
        } = options;
        
        try {
            // Store previous value for comparison
            const previousValue = this.getFieldValue(fieldName);
            
            // Set the value
            if (displayValue) {
                this.form.setDisplayValue(fieldName, value);
            } else {
                this.form.setValue(fieldName, value, triggerEvents);
            }
            
            // Update field state
            this.updateFieldState(fieldName, {
                value,
                previousValue,
                displayValue,
                timestamp: new Date().toISOString(),
                metadata
            });
            
            // Trigger validation if enabled
            if (validate && this.config.autoValidation) {
                this.validateField(fieldName, value);
            }
            
            return {
                success: true,
                field: fieldName,
                value,
                previousValue,
                metadata
            };
            
        } catch (error) {
            this.logError(`Failed to set field ${fieldName}:`, error);
            return {
                success: false,
                field: fieldName,
                error: error.message
            };
        }
    }
    
    /**
     * Get field value with enhanced information
     * @param {string} fieldName - Field name
     * @param {Object} options - Get options
     * @returns {Object} Field value information
     */
    getFieldValue(fieldName, options = {}) {
        const {
            includeDisplayValue = false,
            includeMetadata = false,
            fromCache = this.config.cacheEnabled
        } = options;
        
        // Check cache first
        const cacheKey = `${fieldName}_${JSON.stringify(options)}`;
        if (fromCache && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const result = {
            field: fieldName,
            value: this.form.getValue(fieldName),
            exists: this.form.isFieldVisible(fieldName)
        };
        
        if (includeDisplayValue) {
            result.displayValue = this.form.getDisplayValue(fieldName);
        }
        
        if (includeMetadata) {
            result.metadata = this.getFieldMetadata(fieldName);
        }
        
        // Cache result if enabled
        if (this.config.cacheEnabled) {
            this.cache.set(cacheKey, result);
            
            // Clear cache after 30 seconds
            setTimeout(() => this.cache.delete(cacheKey), 30000);
        }
        
        return result;
    }
    
    /**
     * Bulk field operations with destructuring
     * @param {Object} fieldOperations - Field operations configuration
     * @returns {Array} Array of operation results
     */
    bulkFieldOperations(fieldOperations) {
        const {
            set: setOperations = {},
            clear: clearFields = [],
            hide: hideFields = [],
            show: showFields = [],
            disable: disableFields = [],
            enable: enableFields = []
        } = fieldOperations;
        
        const results = [];
        
        // Set field values
        Object.entries(setOperations).forEach(([fieldName, value]) => {
            results.push(this.setFieldValue(fieldName, value));
        });
        
        // Clear fields
        clearFields.forEach(fieldName => {
            results.push(this.setFieldValue(fieldName, ''));
        });
        
        // Show/hide fields
        [...showFields, ...hideFields].forEach(fieldName => {
            const visible = showFields.includes(fieldName);
            this.form.setVisible(fieldName, visible);
            results.push({ 
                success: true, 
                field: fieldName, 
                operation: visible ? 'show' : 'hide' 
            });
        });
        
        // Enable/disable fields
        [...enableFields, ...disableFields].forEach(fieldName => {
            const enabled = enableFields.includes(fieldName);
            this.form.setReadOnly(fieldName, !enabled);
            results.push({ 
                success: true, 
                field: fieldName, 
                operation: enabled ? 'enable' : 'disable' 
            });
        });
        
        return results;
    }
    
    /**
     * Create field watcher with modern syntax
     * @param {string} fieldName - Field to watch
     * @param {Function} callback - Callback function
     * @param {Object} options - Watcher options
     */
    watchField(fieldName, callback, options = {}) {
        const {
            immediate = false,
            debounce = 0,
            condition = () => true
        } = options;
        
        // Create debounced callback if specified
        const actualCallback = debounce > 0 ? 
            this.debounce(callback, debounce) : callback;
        
        // Wrapper function with condition check
        const watcherCallback = (field, oldValue, newValue) => {
            if (condition(newValue, oldValue, field)) {
                actualCallback(field, oldValue, newValue);
            }
        };
        
        // Store watcher
        if (!this.watchers.has(fieldName)) {
            this.watchers.set(fieldName, new Set());
        }
        this.watchers.get(fieldName).add(watcherCallback);
        
        // Execute immediately if requested
        if (immediate) {
            const currentValue = this.getFieldValue(fieldName).value;
            watcherCallback(fieldName, null, currentValue);
        }
        
        return {
            unwatch: () => this.unwatchField(fieldName, watcherCallback)
        };
    }
    
    /**
     * Remove field watcher
     * @param {string} fieldName - Field name
     * @param {Function} callback - Callback to remove
     */
    unwatchField(fieldName, callback) {
        if (this.watchers.has(fieldName)) {
            this.watchers.get(fieldName).delete(callback);
        }
    }
    
    /**
     * Handle field change with watcher notification
     * @param {string} fieldName - Field that changed
     * @param {any} oldValue - Previous value
     * @param {any} newValue - New value
     */
    handleFieldChange(fieldName, oldValue, newValue) {
        // Update field state
        this.updateFieldState(fieldName, {
            value: newValue,
            previousValue: oldValue,
            timestamp: new Date().toISOString()
        });
        
        // Notify watchers
        if (this.watchers.has(fieldName)) {
            this.watchers.get(fieldName).forEach(callback => {
                try {
                    callback(fieldName, oldValue, newValue);
                } catch (error) {
                    this.logError(`Watcher callback failed for ${fieldName}:`, error);
                }
            });
        }
        
        // Clear related cache entries
        this.clearFieldCache(fieldName);
    }
    
    /**
     * Create field validator with ES6+ patterns
     * @param {string} fieldName - Field to validate
     * @param {Function|Array} validatorFn - Validator function(s)
     * @param {Object} options - Validator options
     */
    addValidator(fieldName, validatorFn, options = {}) {
        const {
            message = 'Validation failed',
            severity = 'error',
            async = false
        } = options;
        
        const validator = {
            fn: Array.isArray(validatorFn) ? validatorFn : [validatorFn],
            message,
            severity,
            async
        };
        
        if (!this.validators.has(fieldName)) {
            this.validators.set(fieldName, []);
        }
        
        this.validators.get(fieldName).push(validator);
    }
    
    /**
     * Validate field with registered validators
     * @param {string} fieldName - Field to validate
     * @param {any} value - Value to validate
     * @returns {Object} Validation result
     */
    async validateField(fieldName, value = null) {
        const fieldValue = value !== null ? value : this.getFieldValue(fieldName).value;
        const validators = this.validators.get(fieldName) || [];
        
        const results = [];
        
        for (const validator of validators) {
            for (const validatorFn of validator.fn) {
                try {
                    const result = validator.async ? 
                        await validatorFn(fieldValue, fieldName) :
                        validatorFn(fieldValue, fieldName);
                    
                    if (!result.valid) {
                        results.push({
                            field: fieldName,
                            valid: false,
                            message: result.message || validator.message,
                            severity: validator.severity
                        });
                    }
                } catch (error) {
                    this.logError(`Validator failed for ${fieldName}:`, error);
                    results.push({
                        field: fieldName,
                        valid: false,
                        message: 'Validation error occurred',
                        severity: 'error'
                    });
                }
            }
        }
        
        const isValid = results.length === 0;
        
        // Display validation messages
        if (!isValid) {
            const errorMessages = results
                .filter(r => r.severity === 'error')
                .map(r => r.message);
            
            if (errorMessages.length > 0) {
                this.form.showFieldMsg(fieldName, errorMessages.join('; '), 'error');
            }
        } else {
            this.form.hideFieldMsg(fieldName);
        }
        
        return {
            valid: isValid,
            results,
            field: fieldName,
            value: fieldValue
        };
    }
    
    /**
     * Get comprehensive field metadata
     * @param {string} fieldName - Field name
     * @returns {Object} Field metadata
     */
    getFieldMetadata(fieldName) {
        return {
            visible: this.form.isFieldVisible(fieldName),
            mandatory: this.form.isMandatory(fieldName),
            readOnly: this.form.isReadOnly(fieldName),
            newRecord: this.form.isNewRecord(),
            fieldType: this.form.getField(fieldName)?.type || 'unknown',
            tableName: this.form.getTableName(),
            hasChoice: this.form.hasField(fieldName) && 
                     this.form.getField(fieldName).choices !== undefined
        };
    }
    
    /**
     * Update field state with modern syntax
     * @param {string} fieldName - Field name
     * @param {Object} stateUpdate - State update
     */
    updateFieldState(fieldName, stateUpdate) {
        const existingState = this.fieldStates.get(fieldName) || {};
        
        // Merge state using spread operator
        const newState = {
            ...existingState,
            ...stateUpdate,
            lastUpdated: new Date().toISOString()
        };
        
        this.fieldStates.set(fieldName, newState);
    }
    
    /**
     * Get field state
     * @param {string} fieldName - Field name
     * @returns {Object} Field state
     */
    getFieldState(fieldName) {
        return this.fieldStates.get(fieldName) || {};
    }
    
    /**
     * Debounce utility function
     * @param {Function} func - Function to debounce
     * @param {number} delay - Delay in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    /**
     * Clear field-related cache entries
     * @param {string} fieldName - Field name
     */
    clearFieldCache(fieldName) {
        const keysToDelete = [];
        
        for (const [key] of this.cache) {
            if (key.startsWith(fieldName)) {
                keysToDelete.push(key);
            }
        }
        
        keysToDelete.forEach(key => this.cache.delete(key));
    }
    
    /**
     * Log error with context
     * @param {string} message - Error message
     * @param {Error} error - Error object
     */
    logError(message, error) {
        console.error(`FormFieldController: ${message}`, error);
        
        if (this.config.debugMode) {
            this.form.addErrorMessage(`Debug: ${message} - ${error.message}`);
        }
    }
    
    /**
     * Cleanup resources
     */
    destroy() {
        this.fieldStates.clear();
        this.validators.clear();
        this.watchers.clear();
        this.cache.clear();
    }
}

// Create global instance with modern syntax
const fieldController = new FormFieldController();

/**
 * Modern field validation patterns
 */
class ModernFieldValidators {
    /**
     * Email validator using modern regex
     * @param {string} value - Email value
     * @returns {Object} Validation result
     */
    static email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = !value || emailRegex.test(value);
        
        return {
            valid,
            message: valid ? '' : 'Please enter a valid email address'
        };
    }
    
    /**
     * Phone number validator with modern formatting
     * @param {string} value - Phone value
     * @returns {Object} Validation result
     */
    static phoneNumber(value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanValue = value?.replace(/[\s\-\(\)]/g, '') || '';
        const valid = !value || phoneRegex.test(cleanValue);
        
        return {
            valid,
            message: valid ? '' : 'Please enter a valid phone number'
        };
    }
    
    /**
     * URL validator
     * @param {string} value - URL value
     * @returns {Object} Validation result
     */
    static url(value) {
        try {
            const valid = !value || Boolean(new URL(value));
            return {
                valid,
                message: valid ? '' : 'Please enter a valid URL'
            };
        } catch {
            return {
                valid: false,
                message: 'Please enter a valid URL'
            };
        }
    }
    
    /**
     * Required field validator
     * @param {any} value - Field value
     * @param {string} fieldName - Field name
     * @returns {Object} Validation result
     */
    static required(value, fieldName) {
        const valid = value !== null && value !== undefined && 
                     value.toString().trim() !== '';
        
        return {
            valid,
            message: valid ? '' : `${fieldName} is required`
        };
    }
    
    /**
     * Length validator with options
     * @param {Object} options - Length options
     * @returns {Function} Validator function
     */
    static length(options = {}) {
        const { min = 0, max = Infinity, exact } = options;
        
        return (value) => {
            const length = value ? value.toString().length : 0;
            let valid = true;
            let message = '';
            
            if (exact !== undefined) {
                valid = length === exact;
                message = `Must be exactly ${exact} characters`;
            } else {
                if (length < min) {
                    valid = false;
                    message = `Must be at least ${min} characters`;
                } else if (length > max) {
                    valid = false;
                    message = `Must not exceed ${max} characters`;
                }
            }
            
            return { valid, message };
        };
    }
    
    /**
     * Custom regex validator
     * @param {RegExp} regex - Regular expression
     * @param {string} message - Error message
     * @returns {Function} Validator function
     */
    static regex(regex, message = 'Invalid format') {
        return (value) => {
            const valid = !value || regex.test(value);
            return {
                valid,
                message: valid ? '' : message
            };
        };
    }
}

/**
 * Modern onChange handler with ES6+ features
 */
const modernOnChange = async (control, oldValue, newValue, isLoading, isTemplate) => {
    if (isLoading || isTemplate || newValue === oldValue) return;
    
    const { name: fieldName } = control;
    
    try {
        // Notify field controller of change
        fieldController.handleFieldChange(fieldName, oldValue, newValue);
        
        // Handle specific field logic with modern patterns
        await handleFieldSpecificLogic(fieldName, newValue, oldValue);
        
    } catch (error) {
        console.error(`Modern onChange failed for ${fieldName}:`, error);
        g_form.addErrorMessage(`Field processing failed: ${error.message}`);
    }
};

/**
 * Handle field-specific logic with pattern matching
 * @param {string} fieldName - Field name
 * @param {any} newValue - New value
 * @param {any} oldValue - Old value
 */
const handleFieldSpecificLogic = async (fieldName, newValue, oldValue) => {
    // Modern switch-case equivalent using object mapping
    const fieldHandlers = {
        priority: () => handlePriorityChange(newValue),
        category: () => handleCategoryChange(newValue),
        caller_id: () => handleCallerChange(newValue),
        impact: () => handleImpactChange(newValue),
        urgency: () => handleUrgencyChange(newValue)
    };
    
    const handler = fieldHandlers[fieldName];
    if (handler) {
        await handler();
    }
};

/**
 * Handle priority change with modern patterns
 * @param {string} priority - Priority value
 */
const handlePriorityChange = async (priority) => {
    // Destructuring with default values
    const priorityMappings = {
        '1': { urgency: '1', escalate: true, notify: true },
        '2': { urgency: '2', escalate: false, notify: true },
        '3': { urgency: '3', escalate: false, notify: false }
    };
    
    const { urgency = '3', escalate = false, notify = false } = 
        priorityMappings[priority] || {};
    
    // Bulk field operations with modern syntax
    const operations = {
        set: { urgency },
        ...(escalate && { set: { ...operations.set, u_escalated: 'true' } })
    };
    
    fieldController.bulkFieldOperations(operations);
    
    if (notify) {
        console.log(`Priority ${priority} set - notifications enabled`);
    }
};

/**
 * Setup modern field patterns on form load
 */
const setupModernFieldPatterns = () => {
    // Initialize field controller
    fieldController.initialize({
        autoValidation: true,
        cacheEnabled: true,
        debugMode: false
    });
    
    // Add modern validators using arrow functions
    fieldController.addValidator('email', ModernFieldValidators.email);
    fieldController.addValidator('phone', ModernFieldValidators.phoneNumber);
    fieldController.addValidator('priority', ModernFieldValidators.required);
    
    // Add length validator for description
    fieldController.addValidator(
        'short_description', 
        ModernFieldValidators.length({ min: 10, max: 160 })
    );
    
    // Setup field watchers with modern syntax
    fieldController.watchField('priority', (field, oldVal, newVal) => {
        console.log(`Priority changed: ${oldVal} → ${newVal}`);
    }, { debounce: 300 });
    
    // Watch multiple related fields
    ['impact', 'urgency'].forEach(field => {
        fieldController.watchField(field, () => updatePriorityCalculation(), {
            debounce: 200,
            condition: (value) => value !== ''
        });
    });
};

/**
 * Modern form state management
 */
class FormStateManager {
    constructor() {
        this.state = new Proxy({}, {
            set: (target, property, value) => {
                const oldValue = target[property];
                target[property] = value;
                this.notifyStateChange(property, value, oldValue);
                return true;
            }
        });
        
        this.subscribers = new Map();
    }
    
    /**
     * Subscribe to state changes
     * @param {string} property - Property to watch
     * @param {Function} callback - Callback function
     */
    subscribe(property, callback) {
        if (!this.subscribers.has(property)) {
            this.subscribers.set(property, new Set());
        }
        this.subscribers.get(property).add(callback);
        
        return () => this.unsubscribe(property, callback);
    }
    
    /**
     * Unsubscribe from state changes
     * @param {string} property - Property name
     * @param {Function} callback - Callback to remove
     */
    unsubscribe(property, callback) {
        if (this.subscribers.has(property)) {
            this.subscribers.get(property).delete(callback);
        }
    }
    
    /**
     * Notify subscribers of state change
     * @param {string} property - Property that changed
     * @param {any} newValue - New value
     * @param {any} oldValue - Old value
     */
    notifyStateChange(property, newValue, oldValue) {
        if (this.subscribers.has(property)) {
            this.subscribers.get(property).forEach(callback => {
                try {
                    callback(newValue, oldValue, property);
                } catch (error) {
                    console.error('State change callback failed:', error);
                }
            });
        }
    }
    
    /**
     * Update state with object spread
     * @param {Object} updates - State updates
     */
    updateState(updates) {
        Object.assign(this.state, updates);
    }
    
    /**
     * Get current state
     * @returns {Object} Current state
     */
    getState() {
        return { ...this.state };
    }
}

// Create global state manager
const formState = new FormStateManager();

/**
 * Modern template literal helpers
 */
const Templates = {
    /**
     * Create error message template
     * @param {string} field - Field name
     * @param {string} error - Error message
     * @returns {string} Formatted error message
     */
    errorMessage: (field, error) => 
        `⚠️ ${field.replace(/_/g, ' ').toUpperCase()}: ${error}`,
    
    /**
     * Create info message template
     * @param {string} action - Action performed
     * @param {string} field - Field name
     * @returns {string} Formatted info message
     */
    infoMessage: (action, field) => 
        `✅ ${action} completed for ${field.replace(/_/g, ' ')}`,
    
    /**
     * Create field label template
     * @param {string} field - Field name
     * @returns {string} Formatted field label
     */
    fieldLabel: (field) => 
        field.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FormFieldController,
        ModernFieldValidators,
        FormStateManager,
        Templates
    };
}
