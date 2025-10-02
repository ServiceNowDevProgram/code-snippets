function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }
    
    // This onChange script should be applied to specific mandatory fields
    // Replace 'FIELD_NAME' with the actual field name you want to validate
    // Example: For priority field, replace with 'priority'
    var fieldName = 'FIELD_NAME'; // TODO: Replace with actual field name
    
    if (g_form.isMandatory(fieldName)) {
        if (!newValue || newValue === '') {
            // Show error message for empty mandatory field
            g_form.showFieldMsg(fieldName, 'This field is required', 'error');
        } else {
            // Hide error message when field is filled
            g_form.hideFieldMsg(fieldName);
        }
    }
}