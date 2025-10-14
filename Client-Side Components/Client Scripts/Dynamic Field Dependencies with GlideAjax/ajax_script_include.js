/**
 * CategoryAjaxUtils Script Include
 * 
 * Name: CategoryAjaxUtils
 * Client callable: true (REQUIRED)
 * Active: true
 * 
 * Description: Server-side Script Include providing data for dynamic field dependencies
 * Supports multiple AJAX methods for category/subcategory and related field operations
 */

var CategoryAjaxUtils = Class.create();
CategoryAjaxUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    
    /**
     * Get subcategories for a given category
     * Parameters: sysparm_category, sysparm_table
     * Returns: JSON array of {value, label} objects
     */
    getSubcategories: function() {
        var category = this.getParameter('sysparm_category');
        var table = this.getParameter('sysparm_table') || 'incident';
        
        // Validate input
        if (!category) {
            return JSON.stringify([]);
        }
        
        var subcategories = [];
        
        try {
            // Query subcategory choices
            var gr = new GlideRecord('sys_choice');
            gr.addQuery('name', table);
            gr.addQuery('element', 'subcategory');
            gr.addQuery('dependent_value', category);
            gr.addQuery('inactive', false);
            gr.orderBy('sequence');
            gr.orderBy('label');
            gr.query();
            
            while (gr.next()) {
                subcategories.push({
                    value: gr.getValue('value'),
                    label: gr.getValue('label')
                });
            }
            
            // If no dependent choices found, get all subcategories
            if (subcategories.length === 0) {
                gr = new GlideRecord('sys_choice');
                gr.addQuery('name', table);
                gr.addQuery('element', 'subcategory');
                gr.addQuery('inactive', false);
                gr.orderBy('sequence');
                gr.orderBy('label');
                gr.setLimit(100); // Limit to prevent performance issues
                gr.query();
                
                while (gr.next()) {
                    subcategories.push({
                        value: gr.getValue('value'),
                        label: gr.getValue('label')
                    });
                }
            }
            
        } catch (ex) {
            gs.error('[CategoryAjaxUtils] Error in getSubcategories: ' + ex.message);
            return 'error';
        }
        
        return JSON.stringify(subcategories);
    },
    
    /**
     * Get all dependent field data in a single call (performance optimization)
     * Parameters: sysparm_category, sysparm_priority, sysparm_assignment_group, sysparm_table
     * Returns: JSON object with multiple field data
     */
    getDependentFields: function() {
        var category = this.getParameter('sysparm_category');
        var priority = this.getParameter('sysparm_priority');
        var assignmentGroup = this.getParameter('sysparm_assignment_group');
        var table = this.getParameter('sysparm_table') || 'incident';
        
        var result = {
            subcategories: [],
            suggested_assignment_group: null,
            sla_info: null,
            estimated_cost: null,
            recommendations: []
        };
        
        try {
            // Get subcategories
            result.subcategories = this._getSubcategoriesArray(category, table);
            
            // Get suggested assignment group based on category
            result.suggested_assignment_group = this._getSuggestedAssignmentGroup(category);
            
            // Get SLA information
            result.sla_info = this._getSLAInfo(category, priority);
            
            // Get estimated cost (if applicable)
            result.estimated_cost = this._getEstimatedCost(category, priority);
            
            // Get recommendations
            result.recommendations = this._getRecommendations(category, priority);
            
        } catch (ex) {
            gs.error('[CategoryAjaxUtils] Error in getDependentFields: ' + ex.message);
            return 'error';
        }
        
        return JSON.stringify(result);
    },
    
    /**
     * Validate field dependencies
     * Parameters: sysparm_category, sysparm_subcategory
     * Returns: JSON object with validation result
     */
    validateDependencies: function() {
        var category = this.getParameter('sysparm_category');
        var subcategory = this.getParameter('sysparm_subcategory');
        
        var result = {
            valid: false,
            message: ''
        };
        
        try {
            // Check if subcategory is valid for the category
            var gr = new GlideRecord('sys_choice');
            gr.addQuery('name', 'incident');
            gr.addQuery('element', 'subcategory');
            gr.addQuery('value', subcategory);
            gr.addQuery('dependent_value', category);
            gr.query();
            
            if (gr.hasNext()) {
                result.valid = true;
                result.message = 'Valid combination';
            } else {
                result.valid = false;
                result.message = 'Invalid subcategory for selected category';
            }
            
        } catch (ex) {
            gs.error('[CategoryAjaxUtils] Error in validateDependencies: ' + ex.message);
            result.valid = false;
            result.message = 'Validation error: ' + ex.message;
        }
        
        return JSON.stringify(result);
    },
    
    // ========================================
    // Private Helper Methods
    // ========================================
    
    /**
     * Get subcategories as array (internal method)
     * @private
     */
    _getSubcategoriesArray: function(category, table) {
        var subcategories = [];
        
        var gr = new GlideRecord('sys_choice');
        gr.addQuery('name', table);
        gr.addQuery('element', 'subcategory');
        gr.addQuery('dependent_value', category);
        gr.addQuery('inactive', false);
        gr.orderBy('sequence');
        gr.orderBy('label');
        gr.query();
        
        while (gr.next()) {
            subcategories.push({
                value: gr.getValue('value'),
                label: gr.getValue('label')
            });
        }
        
        return subcategories;
    },
    
    /**
     * Get suggested assignment group based on category
     * @private
     */
    _getSuggestedAssignmentGroup: function(category) {
        // This could be a lookup table or business rule
        // For demonstration, using a simple mapping
        var categoryGroupMap = {
            'hardware': 'Hardware Support',
            'software': 'Application Support',
            'network': 'Network Operations',
            'database': 'Database Team',
            'inquiry': 'Service Desk'
        };
        
        var groupName = categoryGroupMap[category];
        if (!groupName) {
            return null;
        }
        
        // Look up the actual group sys_id
        var gr = new GlideRecord('sys_user_group');
        gr.addQuery('name', groupName);
        gr.addQuery('active', true);
        gr.query();
        
        if (gr.next()) {
            return gr.getUniqueValue();
        }
        
        return null;
    },
    
    /**
     * Get SLA information based on category and priority
     * @private
     */
    _getSLAInfo: function(category, priority) {
        // Simplified SLA calculation
        // In production, this would query actual SLA definitions
        var resolutionHours = 24; // Default
        
        if (priority == '1') {
            resolutionHours = 4;
        } else if (priority == '2') {
            resolutionHours = 8;
        } else if (priority == '3') {
            resolutionHours = 24;
        } else if (priority == '4') {
            resolutionHours = 72;
        }
        
        // Adjust based on category
        if (category === 'hardware') {
            resolutionHours *= 1.5; // Hardware takes longer
        }
        
        return {
            resolution_time: resolutionHours,
            response_time: resolutionHours / 4
        };
    },
    
    /**
     * Get estimated cost based on category and priority
     * @private
     */
    _getEstimatedCost: function(category, priority) {
        // Simplified cost estimation
        var baseCost = 100;
        
        var categoryMultiplier = {
            'hardware': 2.0,
            'software': 1.5,
            'network': 1.8,
            'database': 1.7,
            'inquiry': 0.5
        };
        
        var priorityMultiplier = {
            '1': 3.0,
            '2': 2.0,
            '3': 1.0,
            '4': 0.5,
            '5': 0.3
        };
        
        var catMult = categoryMultiplier[category] || 1.0;
        var priMult = priorityMultiplier[priority] || 1.0;
        
        return Math.round(baseCost * catMult * priMult);
    },
    
    /**
     * Get recommendations based on category and priority
     * @private
     */
    _getRecommendations: function(category, priority) {
        var recommendations = [];
        
        // Add category-specific recommendations
        if (category === 'hardware') {
            recommendations.push('Attach hardware diagnostic logs');
            recommendations.push('Include serial number and model');
        } else if (category === 'software') {
            recommendations.push('Include application version');
            recommendations.push('Attach error screenshots');
        } else if (category === 'network') {
            recommendations.push('Run network diagnostics');
            recommendations.push('Include IP address and subnet');
        }
        
        // Add priority-specific recommendations
        if (priority == '1' || priority == '2') {
            recommendations.push('Consider escalating to manager');
            recommendations.push('Notify stakeholders immediately');
        }
        
        return recommendations;
    },
    
    /**
     * Validate if a string is a valid sys_id
     * @private
     */
    _isValidSysId: function(value) {
        if (!value || typeof value !== 'string') {
            return false;
        }
        // sys_id is 32 character hex string
        return /^[0-9a-f]{32}$/.test(value);
    },
    
    type: 'CategoryAjaxUtils'
});
