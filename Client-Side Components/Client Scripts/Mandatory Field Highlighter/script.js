function onLoad() {
    // Get all field names on the form
    var fieldNames = g_form.getFieldNames();
    
    // Check each field
    for (var i = 0; i < fieldNames.length; i++) {
        var fieldName = fieldNames[i];
        
        // Skip if field is not mandatory or not visible
        if (!g_form.isMandatory(fieldName) || !g_form.isVisible(fieldName)) {
            continue;
        }
        
        // Get current field value
        var value = g_form.getValue(fieldName);
        
        // Show error message if field is empty
        if (!value || value === '') {
            g_form.showFieldMsg(fieldName, 'This field is required', 'error');
        }
    }
}