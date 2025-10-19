/**
 * Form Field Masking
 * Provides dynamic input masking for form fields with various formats
 */

function onLoad() {
    var masker = new FormFieldMasker();
    masker.initializeMasks();
}

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
    
    var masker = new FormFieldMasker();
    masker.applyMask(control, newValue);
}

var FormFieldMasker = Class.create();
FormFieldMasker.prototype = {
    initialize: function() {
        // Predefined mask patterns
        this.masks = {
            phone: {
                pattern: '(###) ###-####',
                placeholder: '_',
                allowedChars: /[0-9]/
            },
            ssn: {
                pattern: '###-##-####',
                placeholder: 'X',
                allowedChars: /[0-9]/,
                sensitive: true
            },
            creditCard: {
                pattern: '#### #### #### ####',
                placeholder: '_',
                allowedChars: /[0-9]/,
                sensitive: true
            },
            date: {
                pattern: '##/##/####',
                placeholder: '_',
                allowedChars: /[0-9]/
            },
            currency: {
                pattern: '$ ###,###.##',
                placeholder: '0',
                allowedChars: /[0-9.]/
            },
            ipAddress: {
                pattern: '###.###.###.###',
                placeholder: '_',
                allowedChars: /[0-9]/
            }
        };

        // Field to mask mapping
        this.fieldMasks = {};
    },

    initializeMasks: function() {
        var fields = g_form.getFields();
        fields.forEach(function(field) {
            var maskType = this._getMaskType(field.getName());
            if (maskType) {
                this.fieldMasks[field.getName()] = maskType;
                this._setupField(field.getName(), maskType);
            }
        }, this);
    },

    applyMask: function(fieldName, value) {
        var maskType = this.fieldMasks[fieldName] || this._getMaskType(fieldName);
        if (!maskType || !value) return;

        var mask = this.masks[maskType];
        if (!mask) return;

        // Clean the input value
        var cleanValue = this._cleanValue(value, mask.allowedChars);
        
        // Apply the mask
        var maskedValue = this._applyMaskPattern(cleanValue, mask);
        
        // Update the field value
        if (maskedValue !== value) {
            g_form.setValue(fieldName, maskedValue, maskedValue);
        }

        // Apply visual treatment for sensitive fields
        if (mask.sensitive) {
            this._applySensitiveFieldTreatment(fieldName);
        }
    },

    _getMaskType: function(fieldName) {
        // Check for mask type from field attributes
        var maskType = g_form.getValue(fieldName + '_mask_type');
        if (this.masks[maskType]) {
            return maskType;
        }

        // Auto-detect based on field name
        var fieldLower = fieldName.toLowerCase();
        if (fieldLower.includes('phone')) return 'phone';
        if (fieldLower.includes('ssn')) return 'ssn';
        if (fieldLower.includes('credit') || fieldLower.includes('card')) return 'creditCard';
        if (fieldLower.includes('date')) return 'date';
        if (fieldLower.includes('currency') || fieldLower.includes('price')) return 'currency';
        if (fieldLower.includes('ip')) return 'ipAddress';

        return null;
    },

    _setupField: function(fieldName, maskType) {
        var mask = this.masks[maskType];
        if (!mask) return;

        // Set placeholder text
        g_form.setPlaceholder(fieldName, mask.pattern.replace(/#/g, mask.placeholder));

        // Add visual indicator for sensitive fields
        if (mask.sensitive) {
            this._applySensitiveFieldTreatment(fieldName);
        }

        // Apply initial mask if value exists
        var currentValue = g_form.getValue(fieldName);
        if (currentValue) {
            this.applyMask(fieldName, currentValue);
        }
    },

    _cleanValue: function(value, allowedChars) {
        return value.split('').filter(function(char) {
            return allowedChars.test(char);
        }).join('');
    },

    _applyMaskPattern: function(value, mask) {
        var result = mask.pattern;
        var valueIndex = 0;

        // Replace # in pattern with actual values
        for (var i = 0; i < result.length && valueIndex < value.length; i++) {
            if (result[i] === '#') {
                result = result.substr(0, i) + value[valueIndex++] + result.substr(i + 1);
            }
        }

        // Replace remaining # with placeholder
        result = result.replace(/#/g, mask.placeholder);

        return result;
    },

    _applySensitiveFieldTreatment: function(fieldName) {
        // Add sensitive field styling
        var element = g_form.getElement(fieldName);
        if (element) {
            element.addClassName('sensitive-field');
            
            // Add eye icon to toggle visibility
            var container = element.up();
            if (!container.down('.toggle-sensitive')) {
                var toggle = new Element('span', {
                    'class': 'toggle-sensitive icon-eye',
                    'title': 'Toggle field visibility'
                });
                toggle.observe('click', function() {
                    this._toggleSensitiveField(fieldName);
                }.bind(this));
                container.insert(toggle);
            }
        }
    },

    _toggleSensitiveField: function(fieldName) {
        var element = g_form.getElement(fieldName);
        if (element) {
            var isHidden = element.hasClassName('mask-sensitive');
            element.toggleClassName('mask-sensitive');
            
            var toggle = element.up().down('.toggle-sensitive');
            if (toggle) {
                toggle.title = isHidden ? 'Hide sensitive data' : 'Show sensitive data';
                toggle.toggleClassName('icon-eye');
                toggle.toggleClassName('icon-eye-slash');
            }
        }
    },

    type: 'FormFieldMasker'
};