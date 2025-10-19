/**
 * Smart Form Validation
 * Comprehensive form validation with custom rules and real-time feedback
 */

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }
    
    var validator = new SmartFormValidator();
    validator.validateField(control, newValue);
}

function onSubmit() {
    var validator = new SmartFormValidator();
    return validator.validateForm();
}

var SmartFormValidator = Class.create();
SmartFormValidator.prototype = {
    initialize: function() {
        // Validation rules with regex patterns and custom functions
        this.rules = {
            // Basic field types
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                pattern: /^\+?[\d\s-]{10,}$/,
                message: 'Please enter a valid phone number'
            },
            number: {
                pattern: /^\d+$/,
                message: 'Please enter a valid number'
            },
            date: {
                validate: function(value) {
                    var date = new Date(value);
                    return !isNaN(date.getTime());
                },
                message: 'Please enter a valid date'
            },
            // Special validations
            password: {
                validate: function(value) {
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
                },
                message: 'Password must contain at least 8 characters, one letter, one number, and one special character'
            },
            futureDate: {
                validate: function(value) {
                    var date = new Date(value);
                    return date > new Date();
                },
                message: 'Date must be in the future'
            },
            workingHours: {
                validate: function(value) {
                    var time = value.split(':');
                    var hour = parseInt(time[0]);
                    return hour >= 9 && hour < 17;
                },
                message: 'Time must be between 9 AM and 5 PM'
            }
        };

        // Field dependencies storage
        this.dependencies = {};
    },

    // Add a dependency between fields
    addDependency: function(field, dependentField, validationFunc) {
        if (!this.dependencies[field]) {
            this.dependencies[field] = [];
        }
        this.dependencies[field].push({
            field: dependentField,
            validate: validationFunc
        });
    },

    // Validate dependencies for a field
    validateDependencies: function(field) {
        if (this.dependencies[field]) {
            this.dependencies[field].forEach(function(dep) {
                var dependentValue = g_form.getValue(dep.field);
                var isValid = dep.validate(dependentValue);
                
                if (!isValid) {
                    g_form.showFieldMsg(dep.field, 'This field depends on ' + field, 'warning');
                }
            });
        }
    },

    // Validate a single field
    validateField: function(control, value) {
        var fieldType = this._getFieldValidationType(control);
        var rule = this.rules[fieldType];
        
        if (rule) {
            var isValid = rule.pattern ? 
                rule.pattern.test(value) : 
                rule.validate(value);
            
            if (!isValid) {
                g_form.showFieldMsg(control, rule.message, 'error');
                return false;
            }
            
            // Check field dependencies
            this.validateDependencies(control);
            g_form.hideFieldMsg(control);
            return true;
        }
        return true;
    },

    // Validate entire form
    validateForm: function() {
        var isValid = true;
        var fields = g_form.getFields();
        var invalidFields = [];
        
        fields.forEach(function(field) {
            var fieldName = field.getName();
            var value = g_form.getValue(fieldName);
            
            if (!this.validateField(fieldName, value)) {
                isValid = false;
                invalidFields.push(fieldName);
            }
        }, this);
        
        if (!isValid) {
            this._showValidationSummary(invalidFields);
        }
        
        return isValid;
    },

    // Determine validation type for a field
    _getFieldValidationType: function(fieldName) {
        var field = g_form.getField(fieldName);
        var type = field.getType();
        
        // Check for special validation rules
        var validationType = g_form.getValue(fieldName + '_validation_type');
        if (validationType && this.rules[validationType]) {
            return validationType;
        }
        
        // Map field types to validation rules
        switch(type) {
            case 'email':
                return 'email';
            case 'phone':
                return 'phone';
            case 'integer':
            case 'decimal':
                return 'number';
            case 'date':
                return 'date';
            default:
                return null;
        }
    },

    // Show validation summary dialog
    _showValidationSummary: function(invalidFields) {
        var dialog = new GlideModal('validation_summary');
        dialog.setTitle('Form Validation Errors');
        
        var html = '<div class="validation-summary">';
        html += '<p>Please correct the following fields:</p>';
        html += '<ul>';
        
        invalidFields.forEach(function(fieldName) {
            var label = g_form.getLabel(fieldName);
            html += '<li>' + label + '</li>';
        });
        
        html += '</ul></div>';
        dialog.renderWithContent(html);
    },

    type: 'SmartFormValidator'
};