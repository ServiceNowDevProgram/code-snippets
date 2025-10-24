function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    var maxChars = 100;//count of charaters 
    var currentLength = newValue.length;

    // Clear previous messages
    g_form.clearMessages();

    // Show info message
    g_form.addInfoMessage('Character count: ' + currentLength + ' / ' + maxChars);

    if (currentLength > maxChars) {
        // Show error message
        g_form.addErrorMessage('Character limit exceeded! Please shorten your text.');
        g_form.showFieldMsg('short_description', 'Too many characters!', 'error');

        // Make field mandatory to block submission
        g_form.setMandatory('short_description', true);
    } else {
        // Remove mandatory if valid
        g_form.setMandatory('short_description', false);
    }
}
