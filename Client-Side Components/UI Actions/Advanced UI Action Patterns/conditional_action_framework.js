/**
 * Conditional Action Framework
 * 
 * Advanced UI Action pattern that provides dynamic action visibility and behavior
 * based on complex business rules, user roles, and record states.
 * 
 * Features:
 * - Multi-condition evaluation engine
 * - Role-based action control
 * - State-dependent action management
 * - Performance-optimized condition checking
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

// UI Action Condition Script
(function() {
    'use strict';
    
    /**
     * Conditional Action Framework Configuration
     */
    const ConditionalActionFramework = {
        
        /**
         * Define action visibility rules
         */
        visibilityRules: {
            // Rule: Only show for specific states
            stateBasedRules: function(current) {
                const allowedStates = ['1', '2', '6']; // New, In Progress, Resolved
                return allowedStates.includes(current.getValue('state'));
            },
            
            // Rule: Role-based visibility
            roleBasedRules: function(current) {
                const requiredRoles = ['incident_manager', 'itil_admin'];
                return gs.hasRole(requiredRoles.join(','));
            },
            
            // Rule: Business hour restrictions
            businessHourRules: function(current) {
                const now = new GlideDateTime();
                const hour = parseInt(now.getDisplayValue().split(' ')[1].split(':')[0]);
                return hour >= 8 && hour <= 18; // 8 AM to 6 PM
            },
            
            // Rule: Record age restrictions
            recordAgeRules: function(current) {
                const createdOn = new GlideDateTime(current.getValue('sys_created_on'));
                const now = new GlideDateTime();
                const diffInHours = gs.dateDiff(createdOn.getDisplayValue(), now.getDisplayValue(), true) / (1000 * 60 * 60);
                return diffInHours <= 24; // Only show within 24 hours of creation
            },
            
            // Rule: Field value dependencies
            fieldDependencyRules: function(current) {
                const priority = current.getValue('priority');
                const category = current.getValue('category');
                
                // High priority incidents in specific categories
                return (priority === '1' || priority === '2') && 
                       ['hardware', 'software', 'network'].includes(category);
            }
        },
        
        /**
         * Evaluate all visibility rules
         */
        evaluateVisibility: function(current) {
            try {
                const rules = this.visibilityRules;
                
                // All rules must pass for action to be visible
                return rules.stateBasedRules(current) &&
                       rules.roleBasedRules(current) &&
                       rules.businessHourRules(current) &&
                       rules.recordAgeRules(current) &&
                       rules.fieldDependencyRules(current);
                       
            } catch (error) {
                gs.error('ConditionalActionFramework: Error evaluating visibility rules: ' + error.message);
                return false; // Fail safe - hide action on error
            }
        },
        
        /**
         * Advanced condition with caching
         */
        evaluateWithCache: function(current) {
            const cacheKey = 'ui_action_visibility_' + current.getUniqueValue();
            const cached = gs.getProperty(cacheKey);
            
            if (cached) {
                const cacheData = JSON.parse(cached);
                const cacheAge = new Date().getTime() - cacheData.timestamp;
                
                // Cache valid for 5 minutes
                if (cacheAge < 300000) {
                    return cacheData.result === 'true';
                }
            }
            
            // Evaluate and cache result
            const result = this.evaluateVisibility(current);
            const cacheData = {
                result: result.toString(),
                timestamp: new Date().getTime()
            };
            
            gs.setProperty(cacheKey, JSON.stringify(cacheData));
            return result;
        }
    };
    
    // Main condition evaluation
    return ConditionalActionFramework.evaluateWithCache(current);
})();

// UI Action Client Script
function executeConditionalAction() {
    'use strict';
    
    /**
     * Client-side conditional action execution
     */
    const ConditionalActionClient = {
        
        /**
         * Pre-execution validation
         */
        validateExecution: function() {
            const validationRules = [
                this.validateFormState,
                this.validateUserPermissions,
                this.validateBusinessRules
            ];
            
            for (let rule of validationRules) {
                if (!rule.call(this)) {
                    return false;
                }
            }
            return true;
        },
        
        /**
         * Validate form state
         */
        validateFormState: function() {
            if (g_form.isNewRecord()) {
                g_form.addErrorMessage('Action not available for new records');
                return false;
            }
            
            const requiredFields = ['short_description', 'caller_id', 'category'];
            for (let field of requiredFields) {
                if (!g_form.getValue(field)) {
                    g_form.showFieldMsg(field, 'This field is required before executing this action', 'error');
                    return false;
                }
            }
            return true;
        },
        
        /**
         * Validate user permissions
         */
        validateUserPermissions: function() {
            const currentUser = g_user;
            const requiredRoles = ['incident_manager', 'itil_admin'];
            
            if (!currentUser.hasRole(requiredRoles.join(','))) {
                alert('You do not have sufficient permissions to perform this action');
                return false;
            }
            return true;
        },
        
        /**
         * Validate business rules
         */
        validateBusinessRules: function() {
            const state = g_form.getValue('state');
            const priority = g_form.getValue('priority');
            
            // Business rule: High priority incidents must be in specific states
            if (priority === '1' && !['1', '2'].includes(state)) {
                alert('High priority incidents must be in New or In Progress state');
                return false;
            }
            
            return true;
        },
        
        /**
         * Execute the conditional action
         */
        execute: function() {
            if (!this.validateExecution()) {
                return;
            }
            
            // Show loading indicator
            const loadingMsg = g_form.addInfoMessage('Processing action...');
            
            try {
                // Perform the action
                this.performAction();
                
                // Clear loading message
                g_form.hideFieldMsg(loadingMsg);
                g_form.addInfoMessage('Action completed successfully');
                
            } catch (error) {
                g_form.hideFieldMsg(loadingMsg);
                g_form.addErrorMessage('Error executing action: ' + error.message);
            }
        },
        
        /**
         * Perform the actual action
         */
        performAction: function() {
            // Implementation specific to your business logic
            const recordId = g_form.getUniqueValue();
            const actionData = {
                sys_id: recordId,
                action_type: 'conditional_execution',
                execution_context: this.getExecutionContext()
            };
            
            // Example: Make server call or update form
            g_form.setValue('work_notes', 'Conditional action executed at ' + new Date());
            g_form.save();
        },
        
        /**
         * Get execution context
         */
        getExecutionContext: function() {
            return {
                user_id: g_user.userID,
                timestamp: new Date().toISOString(),
                form_state: g_form.serialize(),
                browser_info: navigator.userAgent
            };
        }
    };
    
    // Execute the conditional action
    ConditionalActionClient.execute();
}
