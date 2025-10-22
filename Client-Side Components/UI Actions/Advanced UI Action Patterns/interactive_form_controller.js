/**
 * Interactive Form Controller
 * 
 * Advanced UI Action pattern for creating interactive form experiences with
 * real-time validation, dynamic field dependencies, and progressive disclosure.
 * 
 * Features:
 * - Real-time form validation and updates
 * - Dynamic field dependencies
 * - Progressive disclosure patterns
 * - Smart defaults and auto-completion
 * - Enhanced user experience
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

function initializeInteractiveForm() {
    'use strict';
    
    /**
     * Interactive Form Controller
     */
    const InteractiveFormController = {
        
        // Configuration
        config: {
            validationDelay: 500,
            autoSaveInterval: 30000,
            dependencyUpdateDelay: 200,
            progressiveDisclosureSteps: []
        },
        
        // Form state management
        state: {
            validationTimers: new Map(),
            fieldDependencies: new Map(),
            validationRules: new Map(),
            formProgress: 0,
            isAutoSaving: false,
            lastSaveTime: null
        },
        
        /**
         * Initialize interactive form
         */
        initialize: function() {
            try {
                this.setupFieldDependencies();
                this.setupValidationRules();
                this.setupProgressiveDisclosure();
                this.setupAutoSave();
                this.bindEventHandlers();
                
                g_form.addInfoMessage('Interactive form mode enabled');
                return true;
            } catch (error) {
                g_form.addErrorMessage('Failed to initialize interactive form: ' + error.message);
                return false;
            }
        },
        
        /**
         * Setup field dependencies
         */
        setupFieldDependencies: function() {
            const dependencies = {
                // Category affects subcategory options
                'category': {
                    targets: ['subcategory', 'assignment_group'],
                    handler: this.handleCategoryChange.bind(this)
                },
                
                // Priority affects assignment and escalation
                'priority': {
                    targets: ['assignment_group', 'escalation'],
                    handler: this.handlePriorityChange.bind(this)
                },
                
                // Location affects configuration items
                'location': {
                    targets: ['cmdb_ci', 'affected_user'],
                    handler: this.handleLocationChange.bind(this)
                },
                
                // State affects available actions
                'state': {
                    targets: ['close_code', 'resolution_notes'],
                    handler: this.handleStateChange.bind(this)
                }
            };
            
            // Register dependencies
            Object.keys(dependencies).forEach(field => {
                this.state.fieldDependencies.set(field, dependencies[field]);
                g_form.getControl(field).onchange = () => {
                    this.processDependency(field);
                };
            });
        },
        
        /**
         * Setup validation rules
         */
        setupValidationRules: function() {
            const validationRules = {
                'short_description': {
                    required: true,
                    minLength: 10,
                    pattern: /^[A-Za-z0-9\s\-_.,!?]+$/,
                    customValidator: this.validateDescription.bind(this)
                },
                
                'caller_id': {
                    required: true,
                    customValidator: this.validateCaller.bind(this)
                },
                
                'priority': {
                    required: true,
                    customValidator: this.validatePriority.bind(this)
                },
                
                'category': {
                    required: true,
                    dependsOn: ['caller_id'],
                    customValidator: this.validateCategory.bind(this)
                }
            };
            
            // Register validation rules
            Object.keys(validationRules).forEach(field => {
                this.state.validationRules.set(field, validationRules[field]);
                this.attachFieldValidator(field);
            });
        },
        
        /**
         * Attach validator to field
         */
        attachFieldValidator: function(fieldName) {
            const field = g_form.getControl(fieldName);
            if (field) {
                field.onblur = () => this.validateField(fieldName);
                field.oninput = () => this.scheduleValidation(fieldName);
            }
        },
        
        /**
         * Schedule field validation with debounce
         */
        scheduleValidation: function(fieldName) {
            // Clear existing timer
            if (this.state.validationTimers.has(fieldName)) {
                clearTimeout(this.state.validationTimers.get(fieldName));
            }
            
            // Schedule new validation
            const timer = setTimeout(() => {
                this.validateField(fieldName);
                this.state.validationTimers.delete(fieldName);
            }, this.config.validationDelay);
            
            this.state.validationTimers.set(fieldName, timer);
        },
        
        /**
         * Validate individual field
         */
        validateField: function(fieldName) {
            const rule = this.state.validationRules.get(fieldName);
            if (!rule) return true;
            
            const value = g_form.getValue(fieldName);
            const isValid = this.executeValidationRule(fieldName, value, rule);
            
            this.updateFieldValidationUI(fieldName, isValid);
            this.updateFormProgress();
            
            return isValid;
        },
        
        /**
         * Execute validation rule
         */
        executeValidationRule: function(fieldName, value, rule) {
            try {
                // Required validation
                if (rule.required && (!value || value.trim() === '')) {
                    this.showFieldError(fieldName, 'This field is required');
                    return false;
                }
                
                // Skip other validations if field is empty and not required
                if (!value && !rule.required) return true;
                
                // Minimum length validation
                if (rule.minLength && value.length < rule.minLength) {
                    this.showFieldError(fieldName, `Minimum length is ${rule.minLength} characters`);
                    return false;
                }
                
                // Pattern validation
                if (rule.pattern && !rule.pattern.test(value)) {
                    this.showFieldError(fieldName, 'Invalid format');
                    return false;
                }
                
                // Custom validation
                if (rule.customValidator) {
                    const customResult = rule.customValidator(fieldName, value);
                    if (!customResult.isValid) {
                        this.showFieldError(fieldName, customResult.message);
                        return false;
                    }
                }
                
                // Clear any existing errors
                this.clearFieldError(fieldName);
                return true;
                
            } catch (error) {
                this.showFieldError(fieldName, 'Validation error: ' + error.message);
                return false;
            }
        },
        
        /**
         * Custom validation: Description
         */
        validateDescription: function(fieldName, value) {
            // Check for common words that indicate good description
            const qualityWords = ['issue', 'problem', 'error', 'unable', 'cannot', 'when', 'how', 'what'];
            const hasQualityWords = qualityWords.some(word => value.toLowerCase().includes(word));
            
            if (!hasQualityWords) {
                return {
                    isValid: false,
                    message: 'Please provide a more descriptive summary'
                };
            }
            
            return { isValid: true };
        },
        
        /**
         * Custom validation: Caller
         */
        validateCaller: function(fieldName, value) {
            if (!value) return { isValid: false, message: 'Caller is required' };
            
            // Additional validation could include checking if user exists, is active, etc.
            return { isValid: true };
        },
        
        /**
         * Custom validation: Priority
         */
        validatePriority: function(fieldName, value) {
            const category = g_form.getValue('category');
            
            // Business rule: Security incidents must be high priority
            if (category === 'security' && !['1', '2'].includes(value)) {
                return {
                    isValid: false,
                    message: 'Security incidents must be High or Critical priority'
                };
            }
            
            return { isValid: true };
        },
        
        /**
         * Custom validation: Category
         */
        validateCategory: function(fieldName, value) {
            const callerId = g_form.getValue('caller_id');
            
            if (callerId && value) {
                // Could validate if caller is authorized for certain categories
                return { isValid: true };
            }
            
            return { isValid: true };
        },
        
        /**
         * Process field dependency
         */
        processDependency: function(sourceField) {
            const dependency = this.state.fieldDependencies.get(sourceField);
            if (!dependency) return;
            
            // Debounce dependency processing
            setTimeout(() => {
                dependency.handler(sourceField);
            }, this.config.dependencyUpdateDelay);
        },
        
        /**
         * Handle category change
         */
        handleCategoryChange: function(sourceField) {
            const category = g_form.getValue('category');
            
            // Update subcategory options
            this.updateSubcategoryOptions(category);
            
            // Update assignment group based on category
            this.updateAssignmentGroup(category);
            
            // Auto-populate certain fields based on category
            this.applyCategoryDefaults(category);
        },
        
        /**
         * Handle priority change
         */
        handlePriorityChange: function(sourceField) {
            const priority = g_form.getValue('priority');
            
            // High priority items need immediate assignment
            if (['1', '2'].includes(priority)) {
                this.suggestImmediateAssignment();
            }
            
            // Update escalation settings
            this.updateEscalationSettings(priority);
        },
        
        /**
         * Handle location change
         */
        handleLocationChange: function(sourceField) {
            const location = g_form.getValue('location');
            
            // Filter CIs by location
            this.filterConfigurationItems(location);
            
            // Suggest affected users from location
            this.suggestAffectedUsers(location);
        },
        
        /**
         * Handle state change
         */
        handleStateChange: function(sourceField) {
            const state = g_form.getValue('state');
            
            // Show/hide resolution fields
            this.toggleResolutionFields(state);
            
            // Update available actions
            this.updateAvailableActions(state);
        },
        
        /**
         * Update form progress
         */
        updateFormProgress: function() {
            const totalFields = this.state.validationRules.size;
            let validFields = 0;
            
            this.state.validationRules.forEach((rule, fieldName) => {
                if (this.validateField(fieldName)) {
                    validFields++;
                }
            });
            
            this.state.formProgress = Math.round((validFields / totalFields) * 100);
            this.updateProgressIndicator();
        },
        
        /**
         * Update progress indicator
         */
        updateProgressIndicator: function() {
            // Create or update progress bar
            let progressBar = document.getElementById('form-progress-bar');
            if (!progressBar) {
                progressBar = this.createProgressBar();
            }
            
            const progressFill = progressBar.querySelector('.progress-fill');
            const progressText = progressBar.querySelector('.progress-text');
            
            if (progressFill && progressText) {
                progressFill.style.width = this.state.formProgress + '%';
                progressText.textContent = `Form Completion: ${this.state.formProgress}%`;
            }
        },
        
        /**
         * Create progress bar
         */
        createProgressBar: function() {
            const progressBar = document.createElement('div');
            progressBar.id = 'form-progress-bar';
            progressBar.className = 'form-progress-container';
            progressBar.innerHTML = `
                <div class="progress-text">Form Completion: 0%</div>
                <div class="progress-track">
                    <div class="progress-fill"></div>
                </div>
            `;
            
            // Insert at top of form
            const formElement = document.querySelector('.form-container') || document.body;
            formElement.insertBefore(progressBar, formElement.firstChild);
            
            return progressBar;
        },
        
        /**
         * Setup auto-save functionality
         */
        setupAutoSave: function() {
            setInterval(() => {
                if (!this.state.isAutoSaving && this.hasUnsavedChanges()) {
                    this.performAutoSave();
                }
            }, this.config.autoSaveInterval);
        },
        
        /**
         * Check for unsaved changes
         */
        hasUnsavedChanges: function() {
            // Implementation would check form dirty state
            return g_form.isNewRecord() || g_form.hasFieldMessages();
        },
        
        /**
         * Perform auto-save
         */
        performAutoSave: function() {
            if (this.state.formProgress < 30) return; // Don't auto-save until form is reasonably complete
            
            this.state.isAutoSaving = true;
            
            // Show auto-save indicator
            g_form.addInfoMessage('Auto-saving...', true);
            
            // Perform save
            g_form.save(() => {
                this.state.isAutoSaving = false;
                this.state.lastSaveTime = new Date();
                g_form.addInfoMessage('Auto-saved at ' + this.state.lastSaveTime.toLocaleTimeString(), true);
            });
        },
        
        /**
         * Show field error
         */
        showFieldError: function(fieldName, message) {
            g_form.showFieldMsg(fieldName, message, 'error');
        },
        
        /**
         * Clear field error
         */
        clearFieldError: function(fieldName) {
            g_form.hideFieldMsg(fieldName);
        },
        
        /**
         * Update field validation UI
         */
        updateFieldValidationUI: function(fieldName, isValid) {
            const field = g_form.getControl(fieldName);
            if (field) {
                if (isValid) {
                    field.classList.remove('field-error');
                    field.classList.add('field-valid');
                } else {
                    field.classList.remove('field-valid');
                    field.classList.add('field-error');
                }
            }
        },
        
        /**
         * Bind additional event handlers
         */
        bindEventHandlers: function() {
            // Form submission handler
            g_form.onSubmit(() => {
                return this.validateAllFields();
            });
            
            // Before unload handler for unsaved changes
            window.addEventListener('beforeunload', (e) => {
                if (this.hasUnsavedChanges()) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            });
        },
        
        /**
         * Validate all fields
         */
        validateAllFields: function() {
            let allValid = true;
            
            this.state.validationRules.forEach((rule, fieldName) => {
                if (!this.validateField(fieldName)) {
                    allValid = false;
                }
            });
            
            if (!allValid) {
                g_form.addErrorMessage('Please fix validation errors before submitting');
            }
            
            return allValid;
        }
    };
    
    // Initialize the interactive form controller
    InteractiveFormController.initialize();
    
    // Make controller globally accessible
    window.InteractiveFormController = InteractiveFormController;
}
