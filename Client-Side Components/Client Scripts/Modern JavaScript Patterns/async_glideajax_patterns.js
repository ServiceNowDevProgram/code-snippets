/**
 * Modern Async/Await GlideAjax Patterns
 * 
 * This client script demonstrates modern promise-based and async/await patterns
 * for ServiceNow GlideAjax operations, providing cleaner and more maintainable
 * code compared to traditional callback approaches.
 * 
 * Type: Client Script (All types: onLoad, onChange, onSubmit, onCellEdit)
 * Table: Any table
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Client Scripts/Modern JavaScript
 */

/**
 * Modern GlideAjax wrapper with Promise support
 */
class ModernGlideAjax {
    constructor(scriptInclude) {
        this.scriptInclude = scriptInclude;
        this.defaultTimeout = 30000; // 30 seconds
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
    }
    
    /**
     * Execute server-side function with promise support
     * @param {string} functionName - Server-side function name
     * @param {Object} params - Parameters to pass
     * @param {Object} options - Execution options
     * @returns {Promise} Promise resolving to server response
     */
    async execute(functionName, params = {}, options = {}) {
        const config = {
            timeout: options.timeout || this.defaultTimeout,
            retry: options.retry !== false,
            showLoading: options.showLoading !== false,
            ...options
        };
        
        if (config.showLoading) {
            this._showLoadingIndicator();
        }
        
        try {
            const result = await this._executeWithRetry(functionName, params, config);
            return result;
        } finally {
            if (config.showLoading) {
                this._hideLoadingIndicator();
            }
        }
    }
    
    /**
     * Execute with retry logic
     * @param {string} functionName - Function name
     * @param {Object} params - Parameters
     * @param {Object} config - Configuration
     * @returns {Promise} Promise resolving to result
     * @private
     */
    async _executeWithRetry(functionName, params, config) {
        let lastError;
        
        for (let attempt = 1; attempt <= (config.retry ? this.retryAttempts : 1); attempt++) {
            try {
                return await this._executeRequest(functionName, params, config.timeout);
            } catch (error) {
                lastError = error;
                
                if (attempt < this.retryAttempts && this._isRetryableError(error)) {
                    console.warn(`GlideAjax attempt ${attempt} failed, retrying...`, error);
                    await this._delay(this.retryDelay * attempt);
                } else {
                    break;
                }
            }
        }
        
        throw lastError;
    }
    
    /**
     * Execute single GlideAjax request
     * @param {string} functionName - Function name
     * @param {Object} params - Parameters
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise} Promise resolving to parsed response
     * @private
     */
    _executeRequest(functionName, params, timeout) {
        return new Promise((resolve, reject) => {
            const ga = new GlideAjax(this.scriptInclude);
            ga.addParam('sysparm_name', functionName);
            
            // Add all parameters
            Object.keys(params).forEach(key => {
                ga.addParam(key, params[key]);
            });
            
            // Set up timeout
            const timeoutId = setTimeout(() => {
                reject(new Error(`Request timeout after ${timeout}ms`));
            }, timeout);
            
            ga.getXML(response => {
                clearTimeout(timeoutId);
                
                try {
                    const answer = response.responseXML.documentElement.getAttribute('answer');
                    
                    if (!answer) {
                        reject(new Error('Empty response from server'));
                        return;
                    }
                    
                    // Try to parse as JSON, fallback to string
                    let parsedResponse;
                    try {
                        parsedResponse = JSON.parse(answer);
                    } catch (e) {
                        parsedResponse = answer;
                    }
                    
                    // Check for server-side errors
                    if (parsedResponse && parsedResponse.error) {
                        reject(new Error(parsedResponse.error));
                        return;
                    }
                    
                    resolve(parsedResponse);
                    
                } catch (error) {
                    reject(new Error(`Failed to parse response: ${error.message}`));
                }
            });
        });
    }
    
    /**
     * Check if error is retryable
     * @param {Error} error - Error to check
     * @returns {boolean} True if retryable
     * @private
     */
    _isRetryableError(error) {
        const retryableErrors = [
            'timeout',
            'network',
            'connection',
            'server error'
        ];
        
        const errorMessage = error.message.toLowerCase();
        return retryableErrors.some(retryable => errorMessage.includes(retryable));
    }
    
    /**
     * Delay execution
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise resolving after delay
     * @private
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Show loading indicator
     * @private
     */
    _showLoadingIndicator() {
        if (typeof g_form !== 'undefined') {
            // ServiceNow form loading indicator
            g_form.addInfoMessage('Loading...');
        }
    }
    
    /**
     * Hide loading indicator
     * @private
     */
    _hideLoadingIndicator() {
        if (typeof g_form !== 'undefined') {
            g_form.clearMessages();
        }
    }
}

/**
 * Async form field manager with modern patterns
 */
class AsyncFormManager {
    constructor() {
        this.ajax = new ModernGlideAjax('YourScriptInclude');
        this.cache = new Map();
        this.pendingRequests = new Map();
        this.observers = new Map();
    }
    
    /**
     * Get data with caching and deduplication
     * @param {string} key - Cache key
     * @param {Function} dataFetcher - Function to fetch data
     * @param {Object} options - Options
     * @returns {Promise} Promise resolving to data
     */
    async getCachedData(key, dataFetcher, options = {}) {
        const { ttl = 300000, force = false } = options; // 5 minutes default TTL
        
        // Check cache first
        if (!force && this.cache.has(key)) {
            const cached = this.cache.get(key);
            if (Date.now() - cached.timestamp < ttl) {
                return cached.data;
            }
        }
        
        // Check for pending request
        if (this.pendingRequests.has(key)) {
            return await this.pendingRequests.get(key);
        }
        
        // Create new request
        const request = dataFetcher().then(data => {
            this.cache.set(key, {
                data,
                timestamp: Date.now()
            });
            this.pendingRequests.delete(key);
            return data;
        }).catch(error => {
            this.pendingRequests.delete(key);
            throw error;
        });
        
        this.pendingRequests.set(key, request);
        return await request;
    }
    
    /**
     * Update form field with validation
     * @param {string} fieldName - Field name
     * @param {any} value - Field value
     * @param {Object} options - Update options
     * @returns {Promise} Promise resolving when update complete
     */
    async updateField(fieldName, value, options = {}) {
        const { validate = true, cascade = true } = options;
        
        try {
            // Pre-validation
            if (validate) {
                await this.validateFieldValue(fieldName, value);
            }
            
            // Update field
            g_form.setValue(fieldName, value);
            
            // Trigger cascading updates if enabled
            if (cascade) {
                await this.processCascadingUpdates(fieldName, value);
            }
            
            // Notify observers
            this.notifyObservers(fieldName, value);
            
        } catch (error) {
            console.error(`Failed to update field ${fieldName}:`, error);
            g_form.addErrorMessage(`Failed to update ${fieldName}: ${error.message}`);
            throw error;
        }
    }
    
    /**
     * Validate field value against server rules
     * @param {string} fieldName - Field name
     * @param {any} value - Value to validate
     * @returns {Promise} Promise resolving if valid
     */
    async validateFieldValue(fieldName, value) {
        const validationResult = await this.ajax.execute('validateField', {
            table: g_form.getTableName(),
            field: fieldName,
            value: value,
            record_id: g_form.getUniqueValue()
        });
        
        if (!validationResult.valid) {
            throw new Error(validationResult.message || 'Validation failed');
        }
        
        return validationResult;
    }
    
    /**
     * Process cascading field updates
     * @param {string} triggerField - Field that triggered the update
     * @param {any} value - New value
     * @returns {Promise} Promise resolving when cascading complete
     */
    async processCascadingUpdates(triggerField, value) {
        try {
            const cascadeRules = await this.getCachedData(
                `cascade_rules_${g_form.getTableName()}`,
                () => this.ajax.execute('getCascadeRules', {
                    table: g_form.getTableName(),
                    trigger_field: triggerField
                })
            );
            
            if (cascadeRules && cascadeRules.length > 0) {
                const updates = await Promise.allSettled(
                    cascadeRules.map(rule => this.applyCascadeRule(rule, value))
                );
                
                // Handle any failed updates
                const failures = updates.filter(result => result.status === 'rejected');
                if (failures.length > 0) {
                    console.warn('Some cascade updates failed:', failures);
                }
            }
            
        } catch (error) {
            console.error('Failed to process cascading updates:', error);
            // Don't throw - cascading failures shouldn't block the main update
        }
    }
    
    /**
     * Apply individual cascade rule
     * @param {Object} rule - Cascade rule
     * @param {any} triggerValue - Value that triggered the cascade
     * @returns {Promise} Promise resolving when rule applied
     */
    async applyCascadeRule(rule, triggerValue) {
        const { target_field, calculation_type, parameters } = rule;
        
        let newValue;
        
        switch (calculation_type) {
            case 'lookup':
                newValue = await this.performLookup(parameters, triggerValue);
                break;
            case 'calculation':
                newValue = await this.performCalculation(parameters, triggerValue);
                break;
            case 'clear':
                newValue = '';
                break;
            default:
                throw new Error(`Unknown calculation type: ${calculation_type}`);
        }
        
        g_form.setValue(target_field, newValue);
        return { field: target_field, value: newValue };
    }
    
    /**
     * Perform lookup operation
     * @param {Object} parameters - Lookup parameters
     * @param {any} triggerValue - Trigger value
     * @returns {Promise} Promise resolving to lookup result
     */
    async performLookup(parameters, triggerValue) {
        return await this.ajax.execute('performLookup', {
            ...parameters,
            trigger_value: triggerValue
        });
    }
    
    /**
     * Add field observer
     * @param {string} fieldName - Field to observe
     * @param {Function} callback - Callback function
     */
    addObserver(fieldName, callback) {
        if (!this.observers.has(fieldName)) {
            this.observers.set(fieldName, new Set());
        }
        this.observers.get(fieldName).add(callback);
    }
    
    /**
     * Remove field observer
     * @param {string} fieldName - Field name
     * @param {Function} callback - Callback to remove
     */
    removeObserver(fieldName, callback) {
        if (this.observers.has(fieldName)) {
            this.observers.get(fieldName).delete(callback);
        }
    }
    
    /**
     * Notify field observers
     * @param {string} fieldName - Field name
     * @param {any} value - New value
     */
    notifyObservers(fieldName, value) {
        if (this.observers.has(fieldName)) {
            this.observers.get(fieldName).forEach(callback => {
                try {
                    callback(fieldName, value);
                } catch (error) {
                    console.error('Observer callback failed:', error);
                }
            });
        }
    }
}

// Create global instances for use in form scripts
const modernAjax = new ModernGlideAjax('YourScriptInclude');
const formManager = new AsyncFormManager();

/**
 * Modern onChange handler example
 */
async function modernOnChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || isTemplate || newValue === oldValue) {
        return;
    }
    
    const fieldName = control.name;
    
    try {
        // Example: Update related fields based on selection
        if (fieldName === 'category') {
            await updateCategoryDependentFields(newValue);
        }
        
        // Example: Validate field value
        if (fieldName === 'priority') {
            await validatePrioritySelection(newValue);
        }
        
        // Example: Load additional data
        if (fieldName === 'assignment_group') {
            await loadAssignmentGroupDetails(newValue);
        }
        
    } catch (error) {
        console.error(`onChange failed for ${fieldName}:`, error);
        g_form.addErrorMessage(`Failed to process ${fieldName} change: ${error.message}`);
    }
}

/**
 * Update category-dependent fields
 * @param {string} categoryId - Selected category ID
 */
async function updateCategoryDependentFields(categoryId) {
    if (!categoryId) {
        g_form.clearValue('subcategory');
        g_form.clearValue('u_category_description');
        return;
    }
    
    const categoryData = await formManager.getCachedData(
        `category_${categoryId}`,
        () => modernAjax.execute('getCategoryDetails', { category_id: categoryId })
    );
    
    if (categoryData) {
        // Clear and repopulate subcategory choices
        g_form.clearOptions('subcategory');
        categoryData.subcategories.forEach(sub => {
            g_form.addOption('subcategory', sub.value, sub.label);
        });
        
        // Update description field
        g_form.setValue('u_category_description', categoryData.description);
        
        // Set field requirements based on category
        const isRequired = categoryData.requires_subcategory;
        g_form.setMandatory('subcategory', isRequired);
    }
}

/**
 * Validate priority selection
 * @param {string} priority - Selected priority
 */
async function validatePrioritySelection(priority) {
    if (!priority) return;
    
    const validation = await modernAjax.execute('validatePriority', {
        priority: priority,
        caller_id: g_form.getValue('caller_id'),
        category: g_form.getValue('category')
    });
    
    if (!validation.valid) {
        g_form.addWarningMessage(validation.message);
        
        if (validation.suggested_priority) {
            g_form.setValue('priority', validation.suggested_priority);
        }
    }
}

/**
 * Load assignment group details
 * @param {string} groupId - Assignment group ID
 */
async function loadAssignmentGroupDetails(groupId) {
    if (!groupId) {
        g_form.clearValue('assigned_to');
        return;
    }
    
    const groupDetails = await formManager.getCachedData(
        `group_${groupId}`,
        () => modernAjax.execute('getGroupDetails', { group_id: groupId })
    );
    
    if (groupDetails) {
        // Update assigned_to choices with group members
        g_form.clearOptions('assigned_to');
        g_form.addOption('assigned_to', '', '-- None --');
        
        groupDetails.members.forEach(member => {
            g_form.addOption('assigned_to', member.sys_id, member.name);
        });
        
        // Set default assignee if available
        if (groupDetails.default_assignee) {
            g_form.setValue('assigned_to', groupDetails.default_assignee);
        }
    }
}

/**
 * Modern onLoad handler example
 */
async function modernOnLoad() {
    try {
        // Initialize form enhancements
        await initializeFormEnhancements();
        
        // Load initial data
        await loadInitialFormData();
        
        // Set up field observers
        setupFieldObservers();
        
    } catch (error) {
        console.error('Form initialization failed:', error);
        g_form.addErrorMessage('Form initialization failed. Some features may not work properly.');
    }
}

/**
 * Initialize form enhancements
 */
async function initializeFormEnhancements() {
    // Example: Load user preferences
    const userPrefs = await modernAjax.execute('getUserPreferences', {
        user_id: g_user.userID,
        table: g_form.getTableName()
    });
    
    if (userPrefs) {
        // Apply user preferences
        Object.keys(userPrefs).forEach(fieldName => {
            if (g_form.isFieldVisible(fieldName)) {
                g_form.setValue(fieldName, userPrefs[fieldName]);
            }
        });
    }
}

/**
 * Setup field observers for reactive behavior
 */
function setupFieldObservers() {
    // Add observers for related field updates
    formManager.addObserver('priority', (field, value) => {
        console.log(`Priority changed to: ${value}`);
        // Additional reactive logic here
    });
    
    formManager.addObserver('impact', (field, value) => {
        console.log(`Impact changed to: ${value}`);
        // Update urgency calculation
        updateUrgencyCalculation();
    });
}

/**
 * Utility function with debouncing
 */
const debouncedSearch = (() => {
    let timeoutId;
    return (searchTerm, callback, delay = 300) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(searchTerm);
        }, delay);
    };
})();

/**
 * Example usage in onChange for search field
 */
async function onSearchFieldChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === oldValue) return;
    
    debouncedSearch(newValue, async (term) => {
        if (term.length >= 3) {
            try {
                const results = await modernAjax.execute('searchRecords', {
                    term: term,
                    table: 'cmdb_ci'
                });
                
                displaySearchResults(results);
            } catch (error) {
                console.error('Search failed:', error);
            }
        }
    });
}
