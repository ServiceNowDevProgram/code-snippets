/**
 * Advanced Conditional Field Loader with Multiple Dependencies
 * 
 * Table: incident
 * Type: onChange
 * Field: category, priority, assignment_group (multiple scripts or combined)
 * 
 * Description: Shows/hides and populates fields based on multiple conditions
 * Demonstrates debouncing, caching, and complex business logic
 */

// Global cache object (persists across onChange calls)
if (typeof window.fieldDependencyCache === 'undefined') {
    window.fieldDependencyCache = {};
    window.fieldDependencyTimers = {};
}

/**
 * Main onChange handler for category field
 */
function onChangeCategoryWithDependencies(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading) {
        return;
    }
    
    var priority = g_form.getValue('priority');
    var assignmentGroup = g_form.getValue('assignment_group');
    
    // Update field visibility based on category
    updateFieldVisibility(newValue);
    
    // Load dependent data with debouncing
    loadDependentFields(newValue, priority, assignmentGroup);
}

/**
 * Update field visibility based on category selection
 */
function updateFieldVisibility(category) {
    // Example: Show additional fields for specific categories
    var showAdvancedFields = false;
    var showHardwareFields = false;
    
    // Check cache first
    var cacheKey = 'visibility_' + category;
    if (window.fieldDependencyCache[cacheKey]) {
        var cached = window.fieldDependencyCache[cacheKey];
        showAdvancedFields = cached.advanced;
        showHardwareFields = cached.hardware;
    } else {
        // Determine visibility (this could also be an AJAX call)
        if (category === 'hardware' || category === 'network') {
            showHardwareFields = true;
        }
        
        if (category === 'software' || category === 'database') {
            showAdvancedFields = true;
        }
        
        // Cache the result
        window.fieldDependencyCache[cacheKey] = {
            advanced: showAdvancedFields,
            hardware: showHardwareFields
        };
    }
    
    // Show/hide fields with animation
    if (showHardwareFields) {
        g_form.setSectionDisplay('hardware_details', true);
        g_form.setDisplay('cmdb_ci', true);
        g_form.setDisplay('hardware_model', true);
        g_form.setMandatory('cmdb_ci', true);
    } else {
        g_form.setSectionDisplay('hardware_details', false);
        g_form.setDisplay('cmdb_ci', false);
        g_form.setDisplay('hardware_model', false);
        g_form.setMandatory('cmdb_ci', false);
        g_form.clearValue('cmdb_ci');
        g_form.clearValue('hardware_model');
    }
    
    if (showAdvancedFields) {
        g_form.setDisplay('application', true);
        g_form.setDisplay('version', true);
        g_form.setMandatory('application', true);
    } else {
        g_form.setDisplay('application', false);
        g_form.setDisplay('version', false);
        g_form.setMandatory('application', false);
        g_form.clearValue('application');
        g_form.clearValue('version');
    }
}

/**
 * Load dependent fields with debouncing to prevent excessive AJAX calls
 */
function loadDependentFields(category, priority, assignmentGroup) {
    // Clear existing timer
    if (window.fieldDependencyTimers.loadFields) {
        clearTimeout(window.fieldDependencyTimers.loadFields);
    }
    
    // Set new timer (debounce for 300ms)
    window.fieldDependencyTimers.loadFields = setTimeout(function() {
        executeDependentFieldLoad(category, priority, assignmentGroup);
    }, 300);
}

/**
 * Execute the actual AJAX call to load dependent data
 */
function executeDependentFieldLoad(category, priority, assignmentGroup) {
    // Check cache first
    var cacheKey = 'fields_' + category + '_' + priority + '_' + assignmentGroup;
    if (window.fieldDependencyCache[cacheKey]) {
        applyDependentFieldData(window.fieldDependencyCache[cacheKey]);
        return;
    }
    
    // Show loading indicators
    showLoadingIndicators(['subcategory', 'assignment_group', 'assigned_to']);
    
    // Make AJAX call
    var ga = new GlideAjax('CategoryAjaxUtils');
    ga.addParam('sysparm_name', 'getDependentFields');
    ga.addParam('sysparm_category', category);
    ga.addParam('sysparm_priority', priority);
    ga.addParam('sysparm_assignment_group', assignmentGroup);
    ga.addParam('sysparm_table', g_form.getTableName());
    
    ga.getXMLAnswer(function(response) {
        // Hide loading indicators
        hideLoadingIndicators(['subcategory', 'assignment_group', 'assigned_to']);
        
        if (!response || response === 'error') {
            g_form.addErrorMessage('Failed to load dependent fields. Please refresh and try again.');
            return;
        }
        
        try {
            var data = JSON.parse(response);
            
            // Cache the response
            window.fieldDependencyCache[cacheKey] = data;
            
            // Apply the data
            applyDependentFieldData(data);
            
        } catch (ex) {
            g_form.addErrorMessage('Error processing field dependencies: ' + ex.message);
            console.error('Field dependency error:', ex);
        }
    });
}

/**
 * Apply dependent field data to the form
 */
function applyDependentFieldData(data) {
    // Update subcategories
    if (data.subcategories) {
        g_form.clearOptions('subcategory');
        for (var i = 0; i < data.subcategories.length; i++) {
            var sub = data.subcategories[i];
            g_form.addOption('subcategory', sub.value, sub.label);
        }
    }
    
    // Update suggested assignment group
    if (data.suggested_assignment_group) {
        g_form.setValue('assignment_group', data.suggested_assignment_group);
        g_form.showFieldMsg('assignment_group', 'Auto-populated based on category', 'info', 3000);
    }
    
    // Update SLA information
    if (data.sla_info) {
        var slaMsg = 'Expected resolution time: ' + data.sla_info.resolution_time + ' hours';
        g_form.showFieldMsg('priority', slaMsg, 'info');
    }
    
    // Update estimated cost (if applicable)
    if (data.estimated_cost) {
        g_form.setValue('estimated_cost', data.estimated_cost);
    }
    
    // Show recommendations
    if (data.recommendations && data.recommendations.length > 0) {
        var recMsg = 'Recommendations: ' + data.recommendations.join(', ');
        g_form.addInfoMessage(recMsg);
    }
}

/**
 * Show loading indicators on multiple fields
 */
function showLoadingIndicators(fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        g_form.showFieldMsg(field, 'Loading...', 'info');
        g_form.setReadOnly(field, true);
    }
}

/**
 * Hide loading indicators on multiple fields
 */
function hideLoadingIndicators(fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        g_form.hideFieldMsg(field);
        g_form.setReadOnly(field, false);
    }
}

/**
 * Clear cache (useful for testing or when data changes)
 */
function clearFieldDependencyCache() {
    window.fieldDependencyCache = {};
    console.log('Field dependency cache cleared');
}

/**
 * onLoad script to initialize form
 * Type: onLoad
 */
function onLoadInitializeDependencies() {
    // Initialize cache
    if (typeof window.fieldDependencyCache === 'undefined') {
        window.fieldDependencyCache = {};
        window.fieldDependencyTimers = {};
    }
    
    // Load initial dependencies if category is already set
    var category = g_form.getValue('category');
    if (category) {
        updateFieldVisibility(category);
    }
    
    // Add cache clear button for admins (optional)
    if (g_user.hasRole('admin')) {
        console.log('Field dependency cache available. Use clearFieldDependencyCache() to clear.');
    }
}
