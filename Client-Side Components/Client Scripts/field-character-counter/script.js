function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
    
    // USER CONFIGURATION: Set field name and character limit
    var fieldName = 'Description';  // Change to your field name
    var maxLength = 80;                  // Change to your character limit
    
    var currentLength = newValue ? newValue.length : 0;
    var remaining = maxLength - currentLength;
    
    // Clear any existing messages
    g_form.hideFieldMsg(fieldName);
    
    // Show appropriate message based on remaining characters
    if (remaining < 0) {
        g_form.showFieldMsg(fieldName, 'Exceeds limit by ' + Math.abs(remaining) + ' characters', 'error');
    } else if (remaining <= 20) {
        g_form.showFieldMsg(fieldName, remaining + ' characters remaining', 'warning');
    } else if (remaining <= 50) {
        g_form.showFieldMsg(fieldName, remaining + ' characters remaining', 'info');
    }
}