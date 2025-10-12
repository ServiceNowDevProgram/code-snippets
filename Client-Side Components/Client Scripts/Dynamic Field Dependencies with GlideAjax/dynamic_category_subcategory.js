/**
 * Dynamic Category/Subcategory Client Script
 * 
 * Table: incident (or any table with category/subcategory fields)
 * Type: onChange
 * Field: category
 * 
 * Description: Dynamically populates subcategory field based on selected category
 * using GlideAjax to fetch filtered options from server
 */

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    // Don't run during form load or if value hasn't changed
    if (isLoading || newValue === '') {
        return;
    }
    
    // Clear subcategory when category changes
    g_form.clearValue('subcategory');
    
    // Show loading indicator
    g_form.showFieldMsg('subcategory', 'Loading subcategories...', 'info');
    g_form.setReadOnly('subcategory', true);
    
    // Make AJAX call to get filtered subcategories
    var ga = new GlideAjax('CategoryAjaxUtils');
    ga.addParam('sysparm_name', 'getSubcategories');
    ga.addParam('sysparm_category', newValue);
    ga.addParam('sysparm_table', g_form.getTableName());
    
    ga.getXMLAnswer(function(response) {
        // Clear loading indicator
        g_form.hideFieldMsg('subcategory');
        g_form.setReadOnly('subcategory', false);
        
        // Handle error response
        if (!response || response === 'error') {
            g_form.addErrorMessage('Failed to load subcategories. Please try again.');
            return;
        }
        
        // Parse response
        try {
            var subcategories = JSON.parse(response);
            
            // Clear existing options (except empty option)
            g_form.clearOptions('subcategory');
            
            // Add new options
            if (subcategories.length === 0) {
                g_form.addInfoMessage('No subcategories available for this category.');
                g_form.setReadOnly('subcategory', true);
            } else {
                // Add each subcategory as an option
                for (var i = 0; i < subcategories.length; i++) {
                    var sub = subcategories[i];
                    g_form.addOption('subcategory', sub.value, sub.label);
                }
                
                // Auto-select if only one option
                if (subcategories.length === 1) {
                    g_form.setValue('subcategory', subcategories[0].value);
                }
                
                // Show success message
                g_form.showFieldMsg('subcategory', subcategories.length + ' subcategories loaded', 'info', 2000);
            }
            
        } catch (ex) {
            g_form.addErrorMessage('Error parsing subcategory data: ' + ex.message);
            console.error('Subcategory parsing error:', ex);
        }
    });
}
