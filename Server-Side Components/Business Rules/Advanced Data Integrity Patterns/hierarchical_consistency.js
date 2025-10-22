/**
 * Hierarchical Data Consistency Business Rule
 * 
 * This business rule maintains data consistency in hierarchical structures
 * by automatically synchronizing parent-child relationships and validating
 * hierarchical constraints.
 * 
 * Table: Tables with hierarchical relationships (e.g., cmdb_ci, sys_user_group)
 * When: before insert, before update, after insert, after update
 * Order: 200
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Data Integrity/Hierarchical
 */

(function executeRule(current, previous) {
    
    // Initialize the hierarchical consistency manager
    var hierarchyManager = new HierarchicalConsistencyManager(current, previous);
    
    // Configure hierarchy rules based on table
    hierarchyManager.configureHierarchy();
    
    // Execute consistency checks and updates
    hierarchyManager.maintainConsistency();
    
})(current, previous);

/**
 * Hierarchical Data Consistency Manager
 */
var HierarchicalConsistencyManager = Class.create();
HierarchicalConsistencyManager.prototype = {
    
    initialize: function(current, previous) {
        this.current = current;
        this.previous = previous;
        this.tableName = current.getTableName();
        this.hierarchyConfig = {};
        this.processedRecords = new Set();
        this.maxDepth = 50; // Prevent infinite recursion
        this.currentDepth = 0;
        
        this.context = {
            operation: this._getOperation(),
            timestamp: new GlideDateTime(),
            user: gs.getUserID(),
            changes: this._getFieldChanges()
        };
    },
    
    /**
     * Configure hierarchy rules based on table type
     */
    configureHierarchy: function() {
        
        switch (this.tableName) {
            case 'cmdb_ci':
                this._configureCIHierarchy();
                break;
            case 'sys_user_group':
                this._configureGroupHierarchy();
                break;
            case 'cmn_department':
                this._configureDepartmentHierarchy();
                break;
            case 'cmn_cost_center':
                this._configureCostCenterHierarchy();
                break;
            case 'cmn_location':
                this._configureLocationHierarchy();
                break;
            default:
                this._configureGenericHierarchy();
                break;
        }
    },
    
    /**
     * Maintain hierarchical data consistency
     */
    maintainConsistency: function() {
        try {
            var operation = this.context.operation;
            
            switch (operation) {
                case 'before_insert':
                case 'before_update':
                    this._validateHierarchicalConstraints();
                    this._preventCircularReferences();
                    this._validateHierarchyDepth();
                    break;
                    
                case 'after_insert':
                case 'after_update':
                    this._propagateHierarchicalChanges();
                    this._updateDerivedFields();
                    this._maintainHierarchyIndexes();
                    break;
            }
            
        } catch (e) {
            gs.error('HierarchicalConsistencyManager: Error maintaining consistency: ' + e.message);
            if (operation.startsWith('before_')) {
                current.setAbortAction(true);
                gs.addErrorMessage('Hierarchy validation failed: ' + e.message);
            }
        }
    },
    
    /**
     * Configure CI hierarchy rules
     * @private
     */
    _configureCIHierarchy: function() {
        this.hierarchyConfig = {
            parentField: 'parent',
            childrenTable: 'cmdb_ci',
            childrenField: 'parent',
            hierarchyFields: ['company', 'location', 'department'],
            derivedFields: {
                'hierarchy_path': this._buildHierarchyPath,
                'hierarchy_level': this._calculateHierarchyLevel,
                'root_ci': this._findRootCI
            },
            constraints: {
                maxDepth: 10,
                inheritFromParent: ['company', 'location'],
                validateRelationships: true
            },
            propagationRules: [
                {
                    field: 'company',
                    propagateDown: true,
                    propagateUp: false,
                    condition: function(current, child) {
                        return child.getValue('inherit_company') === 'true';
                    }
                },
                {
                    field: 'operational_status',
                    propagateDown: true,
                    propagateUp: false,
                    condition: function(current, child) {
                        return current.getValue('operational_status') === '2'; // Non-Operational
                    }
                }
            ]
        };
    },
    
    /**
     * Configure group hierarchy rules
     * @private
     */
    _configureGroupHierarchy: function() {
        this.hierarchyConfig = {
            parentField: 'parent',
            childrenTable: 'sys_user_group',
            childrenField: 'parent',
            hierarchyFields: ['type', 'source'],
            derivedFields: {
                'hierarchy_path': this._buildHierarchyPath,
                'hierarchy_level': this._calculateHierarchyLevel
            },
            constraints: {
                maxDepth: 8,
                inheritFromParent: ['type'],
                validateMembership: true
            },
            propagationRules: [
                {
                    field: 'active',
                    propagateDown: true,
                    propagateUp: false,
                    condition: function(current, child) {
                        return current.getValue('active') === 'false';
                    }
                }
            ]
        };
    },
    
    /**
     * Validate hierarchical constraints
     * @private
     */
    _validateHierarchicalConstraints: function() {
        var config = this.hierarchyConfig;
        var parentField = config.parentField;
        
        if (!parentField || !this.current.isValidField(parentField)) {
            return;
        }
        
        var parentId = this.current.getValue(parentField);
        if (!parentId) {
            return; // No parent, no constraint violations
        }
        
        // Validate parent exists and is active
        this._validateParentExists(parentId);
        
        // Validate inheritance rules
        this._validateInheritanceRules(parentId);
        
        // Validate business constraints
        this._validateBusinessConstraints(parentId);
    },
    
    /**
     * Prevent circular references in hierarchy
     * @private
     */
    _preventCircularReferences: function() {
        var config = this.hierarchyConfig;
        var parentField = config.parentField;
        
        if (!parentField || !this.current.isValidField(parentField)) {
            return;
        }
        
        var parentId = this.current.getValue(parentField);
        if (!parentId) {
            return;
        }
        
        var currentId = this.current.getValue('sys_id');
        var visitedNodes = new Set();
        var currentNodeId = parentId;
        
        while (currentNodeId && !visitedNodes.has(currentNodeId)) {
            if (currentNodeId === currentId) {
                throw new Error('Circular reference detected in hierarchy');
            }
            
            visitedNodes.add(currentNodeId);
            
            // Get next parent
            var parentRecord = new GlideRecord(this.tableName);
            if (parentRecord.get(currentNodeId)) {
                currentNodeId = parentRecord.getValue(parentField);
            } else {
                break;
            }
            
            // Safety check for infinite loops
            if (visitedNodes.size > this.maxDepth) {
                throw new Error('Hierarchy depth exceeds maximum allowed');
            }
        }
    },
    
    /**
     * Validate hierarchy depth limits
     * @private
     */
    _validateHierarchyDepth: function() {
        var config = this.hierarchyConfig;
        var maxDepth = config.constraints ? config.constraints.maxDepth : this.maxDepth;
        
        var depth = this._calculateCurrentDepth();
        
        if (depth > maxDepth) {
            throw new Error('Hierarchy depth (' + depth + ') exceeds maximum allowed (' + maxDepth + ')');
        }
    },
    
    /**
     * Propagate hierarchical changes to children
     * @private
     */
    _propagateHierarchicalChanges: function() {
        var config = this.hierarchyConfig;
        var propagationRules = config.propagationRules || [];
        
        if (propagationRules.length === 0) {
            return;
        }
        
        // Check which fields have changed
        var changedFields = Object.keys(this.context.changes);
        
        for (var i = 0; i < propagationRules.length; i++) {
            var rule = propagationRules[i];
            
            if (changedFields.indexOf(rule.field) !== -1) {
                if (rule.propagateDown) {
                    this._propagateToChildren(rule);
                }
                if (rule.propagateUp) {
                    this._propagateToParent(rule);
                }
            }
        }
    },
    
    /**
     * Propagate changes to child records
     * @param {Object} rule - Propagation rule
     * @private
     */
    _propagateToChildren: function(rule) {
        var config = this.hierarchyConfig;
        var childrenGr = new GlideRecord(config.childrenTable);
        childrenGr.addQuery(config.childrenField, this.current.sys_id);
        childrenGr.query();
        
        while (childrenGr.next()) {
            // Check if rule condition is met
            if (rule.condition && !rule.condition(this.current, childrenGr)) {
                continue;
            }
            
            // Prevent infinite recursion
            var childId = childrenGr.getValue('sys_id');
            if (this.processedRecords.has(childId)) {
                continue;
            }
            
            this.processedRecords.add(childId);
            
            // Update child record
            var newValue = this.current.getValue(rule.field);
            if (childrenGr.getValue(rule.field) !== newValue) {
                childrenGr.setValue(rule.field, newValue);
                childrenGr.update();
                
                gs.info('HierarchicalConsistencyManager: Propagated ' + rule.field + 
                       ' from ' + this.current.sys_id + ' to child ' + childId);
            }
        }
    },
    
    /**
     * Update derived hierarchy fields
     * @private
     */
    _updateDerivedFields: function() {
        var config = this.hierarchyConfig;
        var derivedFields = config.derivedFields || {};
        
        for (var fieldName in derivedFields) {
            if (derivedFields.hasOwnProperty(fieldName)) {
                var calculator = derivedFields[fieldName];
                
                if (typeof calculator === 'function') {
                    try {
                        var newValue = calculator.call(this, this.current);
                        
                        if (this.current.isValidField(fieldName)) {
                            var currentValue = this.current.getValue(fieldName);
                            if (currentValue !== newValue) {
                                this.current.setValue(fieldName, newValue);
                                // Note: This will be updated when current record is saved
                                gs.info('HierarchicalConsistencyManager: Updated derived field ' + 
                                       fieldName + ' to: ' + newValue);
                            }
                        }
                    } catch (e) {
                        gs.error('HierarchicalConsistencyManager: Error calculating ' + 
                               fieldName + ': ' + e.message);
                    }
                }
            }
        }
    },
    
    /**
     * Build hierarchy path for current record
     * @param {GlideRecord} record - Current record
     * @returns {string} Hierarchy path
     * @private
     */
    _buildHierarchyPath: function(record) {
        var path = [];
        var currentRecord = record;
        var config = this.hierarchyConfig;
        var parentField = config.parentField;
        var visited = new Set();
        
        while (currentRecord && !visited.has(currentRecord.getValue('sys_id'))) {
            visited.add(currentRecord.getValue('sys_id'));
            path.unshift(currentRecord.getDisplayValue());
            
            var parentId = currentRecord.getValue(parentField);
            if (parentId) {
                var parentGr = new GlideRecord(currentRecord.getTableName());
                if (parentGr.get(parentId)) {
                    currentRecord = parentGr;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        
        return path.join(' > ');
    },
    
    /**
     * Calculate hierarchy level for current record
     * @param {GlideRecord} record - Current record
     * @returns {number} Hierarchy level (0 = root)
     * @private
     */
    _calculateHierarchyLevel: function(record) {
        var level = 0;
        var currentRecord = record;
        var config = this.hierarchyConfig;
        var parentField = config.parentField;
        var visited = new Set();
        
        while (currentRecord && !visited.has(currentRecord.getValue('sys_id'))) {
            visited.add(currentRecord.getValue('sys_id'));
            
            var parentId = currentRecord.getValue(parentField);
            if (parentId) {
                level++;
                var parentGr = new GlideRecord(currentRecord.getTableName());
                if (parentGr.get(parentId)) {
                    currentRecord = parentGr;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        
        return level;
    },
    
    /**
     * Find root CI in hierarchy
     * @param {GlideRecord} record - Current record
     * @returns {string} Root CI sys_id
     * @private
     */
    _findRootCI: function(record) {
        var currentRecord = record;
        var config = this.hierarchyConfig;
        var parentField = config.parentField;
        var visited = new Set();
        
        while (currentRecord && !visited.has(currentRecord.getValue('sys_id'))) {
            visited.add(currentRecord.getValue('sys_id'));
            
            var parentId = currentRecord.getValue(parentField);
            if (parentId) {
                var parentGr = new GlideRecord(currentRecord.getTableName());
                if (parentGr.get(parentId)) {
                    currentRecord = parentGr;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        
        return currentRecord ? currentRecord.getValue('sys_id') : record.getValue('sys_id');
    },
    
    /**
     * Validate parent record exists and is valid
     * @param {string} parentId - Parent record sys_id
     * @private
     */
    _validateParentExists: function(parentId) {
        var parentGr = new GlideRecord(this.tableName);
        
        if (!parentGr.get(parentId)) {
            throw new Error('Parent record does not exist');
        }
        
        if (parentGr.getValue('active') === 'false') {
            throw new Error('Cannot assign inactive parent record');
        }
    },
    
    /**
     * Get current operation type with timing
     * @returns {string} Operation type
     * @private
     */
    _getOperation: function() {
        // This would need to be set from the business rule timing
        // For now, we'll determine based on the record state
        if (this.current.isNewRecord()) {
            return gs.action.startsWith('before') ? 'before_insert' : 'after_insert';
        } else {
            return gs.action.startsWith('before') ? 'before_update' : 'after_update';
        }
    },
    
    /**
     * Get field changes between previous and current values
     * @returns {Object} Changed fields with old and new values
     * @private
     */
    _getFieldChanges: function() {
        var changes = {};
        
        if (this.previous) {
            var elements = this.current.getElements();
            
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var fieldName = element.getName();
                var currentValue = this.current.getValue(fieldName);
                var previousValue = this.previous.getValue(fieldName);
                
                if (currentValue !== previousValue) {
                    changes[fieldName] = {
                        oldValue: previousValue,
                        newValue: currentValue
                    };
                }
            }
        }
        
        return changes;
    },
    
    type: 'HierarchicalConsistencyManager'
};
