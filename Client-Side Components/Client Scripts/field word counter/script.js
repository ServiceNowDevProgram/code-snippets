function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    // USER CONFIGURATION: Set field name and word limit
    var fieldName = 'short_description';  // Change to your field name
    var maxWords = 25;                    // Change to your word limit

    var trimmedValue = newValue ? newValue.trim() : '';
    var currentWords = trimmedValue ? trimmedValue.replace(/\s+/g, ' ').split(' ').length : 0;

    // Clear any existing messages
    g_form.clearMessages();

    // Show appropriate message based on word count
    if (currentWords > maxWords) {
        g_form.addErrorMessage(fieldName + ' ' + currentWords + ' out of ' + maxWords + ' words - Limit exceeded', ' error');
    } else if (currentWords >= maxWords - 5) {
        g_form.addInfoMessage(fieldName + ' ' + currentWords + ' out of ' + maxWords + ' words - Approaching limit', ' warning');
    } else {
        g_form.addInfoMessage(fieldName + ' ' + currentWords + ' out of ' + maxWords + ' words', ' info');
    }
}