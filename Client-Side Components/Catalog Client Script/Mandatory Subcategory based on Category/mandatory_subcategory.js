// Type: onChange
// Table: incident
// Field: category
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    
    // Make subcategory mandatory when category is selected
    if (newValue=="<category_name>") {
        g_form.setMandatory('subcategory', true);
        g_form.showFieldMsg('subcategory', 'Please select a subcategory', 'info');
    } else {
        g_form.setMandatory('subcategory', false);
        g_form.hideFieldMsg('subcategory');
    }
}
