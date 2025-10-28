function onLoad() {

    // USER CONFIGURATION: Add field names you want to check (comma-separated)
    var fieldsToCheck = 'short_description,priority,category,caller_id';
    
    // Convert to array and process
    var fieldArray = fieldsToCheck.split(',');
    
    // Check each field
    for (var i = 0; i < fieldArray.length; i++) {
        var fieldName = fieldArray[i];
        
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