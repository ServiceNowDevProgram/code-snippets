function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }
    
    // Update highlighting for the changed field
    var fieldName = control.fieldName;
    
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