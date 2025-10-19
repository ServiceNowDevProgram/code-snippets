/**
 * Form Field Dependencies Manager
 * Manages complex field relationships, cascading changes, and conditional visibility
 */

function onLoad() {
    var manager = new FieldDependenciesManager();
    manager.initialize();
}

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
    
    var manager = new FieldDependenciesManager();
    manager.handleFieldChange(control, oldValue, newValue);
}

var FieldDependenciesManager = Class.create();
FieldDependenciesManager.prototype = {
    initialize: function() {
        // Dependencies configuration
        this.dependencies = {
            // Field relationships
            relationships: {},
            // Cascading rules
            cascades: {},
            // Visibility conditions
            visibility: {},
            // Mandatory field rules
            mandatory: {},
            // Field value mappings
            valueMaps: {}
        };

        // Cache for field values
        this.fieldCache = {};
        
        // Load and setup dependencies
        this._loadDependencies();
        this._setupInitialState();
    },

    handleFieldChange: function(changedField, oldValue, newValue) {
        try {
            // Update cache
            this.fieldCache[changedField] = newValue;

            // Process different types of dependencies
            this._processCascadingChanges(changedField, newValue);
            this._processVisibilityRules(changedField, newValue);
            this._processMandatoryRules(changedField, newValue);
            this._processValueMappings(changedField, newValue);

            // Log dependency chain for debugging
            this._logDependencyChain(changedField);
        } catch (e) {
            console.error('Error processing dependencies:', e);
            g_form.addErrorMessage('Error processing field dependencies');
        }
    },

    addDependency: function(config) {
        try {
            const { type, sourceField, targetField, rule } = config;
            
            switch(type) {
                case 'cascade':
                    this.dependencies.cascades[sourceField] = 
                        this.dependencies.cascades[sourceField] || [];
                    this.dependencies.cascades[sourceField].push({
                        target: targetField,
                        rule: rule
                    });
                    break;
                    
                case 'visibility':
                    this.dependencies.visibility[targetField] = 
                        this.dependencies.visibility[targetField] || [];
                    this.dependencies.visibility[targetField].push({
                        source: sourceField,
                        condition: rule
                    });
                    break;
                    
                case 'mandatory':
                    this.dependencies.mandatory[targetField] = 
                        this.dependencies.mandatory[targetField] || [];
                    this.dependencies.mandatory[targetField].push({
                        source: sourceField,
                        condition: rule
                    });
                    break;
                    
                case 'valueMap':
                    this.dependencies.valueMaps[sourceField] = 
                        this.dependencies.valueMaps[sourceField] || {};
                    this.dependencies.valueMaps[sourceField][targetField] = rule;
                    break;
            }
        } catch (e) {
            console.error('Error adding dependency:', e);
        }
    },

    _loadDependencies: function() {
        // Load dependencies from catalog item variables
        var fields = g_form.getFields();
        fields.forEach(function(field) {
            var fieldName = field.getName();
            
            // Check for dependency configurations
            var dependencyConfig = g_form.getValue(fieldName + '_dependencies');
            if (dependencyConfig) {
                try {
                    var config = JSON.parse(dependencyConfig);
                    this.addDependency(config);
                } catch (e) {
                    console.error('Error loading dependency config for ' + fieldName, e);
                }
            }
        }, this);
    },

    _setupInitialState: function() {
        // Initialize field cache
        var fields = g_form.getFields();
        fields.forEach(function(field) {
            var fieldName = field.getName();
            this.fieldCache[fieldName] = g_form.getValue(fieldName);
        }, this);

        // Process initial states
        Object.keys(this.dependencies.visibility).forEach(function(field) {
            this._processVisibilityRules(field, this.fieldCache[field]);
        }, this);

        Object.keys(this.dependencies.mandatory).forEach(function(field) {
            this._processMandatoryRules(field, this.fieldCache[field]);
        }, this);
    },

    _processCascadingChanges: function(sourceField, newValue) {
        var cascades = this.dependencies.cascades[sourceField];
        if (!cascades) return;

        cascades.forEach(function(cascade) {
            try {
                var targetValue = cascade.rule(newValue, this.fieldCache);
                g_form.setValue(cascade.target, targetValue);
            } catch (e) {
                console.error('Error in cascade rule:', e);
            }
        }, this);
    },

    _processVisibilityRules: function(sourceField, newValue) {
        Object.keys(this.dependencies.visibility).forEach(function(targetField) {
            var rules = this.dependencies.visibility[targetField];
            var shouldBeVisible = rules.every(function(rule) {
                return rule.source === sourceField ? 
                    rule.condition(newValue, this.fieldCache) : 
                    rule.condition(this.fieldCache[rule.source], this.fieldCache);
            }, this);

            if (shouldBeVisible) {
                g_form.showFieldMsg(targetField, '', 'info');
                g_form.setVisible(targetField, true);
            } else {
                g_form.hideFieldMsg(targetField);
                g_form.setVisible(targetField, false);
            }
        }, this);
    },

    _processMandatoryRules: function(sourceField, newValue) {
        Object.keys(this.dependencies.mandatory).forEach(function(targetField) {
            var rules = this.dependencies.mandatory[targetField];
            var shouldBeMandatory = rules.some(function(rule) {
                return rule.source === sourceField ? 
                    rule.condition(newValue, this.fieldCache) : 
                    rule.condition(this.fieldCache[rule.source], this.fieldCache);
            }, this);

            g_form.setMandatory(targetField, shouldBeMandatory);
        }, this);
    },

    _processValueMappings: function(sourceField, newValue) {
        var mappings = this.dependencies.valueMaps[sourceField];
        if (!mappings) return;

        Object.keys(mappings).forEach(function(targetField) {
            var mapRule = mappings[targetField];
            try {
                var mappedValue = mapRule(newValue, this.fieldCache);
                if (mappedValue !== undefined) {
                    g_form.setValue(targetField, mappedValue);
                }
            } catch (e) {
                console.error('Error in value mapping:', e);
            }
        }, this);
    },

    _logDependencyChain: function(sourceField) {
        var chain = this._buildDependencyChain(sourceField);
        console.log('Dependency chain for ' + sourceField + ':', chain);
    },

    _buildDependencyChain: function(field, visited = new Set()) {
        if (visited.has(field)) return [];
        visited.add(field);

        var chain = [];
        
        // Check cascading dependencies
        var cascades = this.dependencies.cascades[field] || [];
        cascades.forEach(function(cascade) {
            chain.push({
                type: 'cascade',
                from: field,
                to: cascade.target
            });
            chain = chain.concat(this._buildDependencyChain(cascade.target, visited));
        }, this);

        // Check visibility dependencies
        Object.keys(this.dependencies.visibility).forEach(function(targetField) {
            var rules = this.dependencies.visibility[targetField];
            if (rules.some(rule => rule.source === field)) {
                chain.push({
                    type: 'visibility',
                    from: field,
                    to: targetField
                });
                chain = chain.concat(this._buildDependencyChain(targetField, visited));
            }
        }, this);

        return chain;
    },

    type: 'FieldDependenciesManager'
};