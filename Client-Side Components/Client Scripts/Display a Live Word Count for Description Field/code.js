function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === oldValue) {
        return;
    }

    var wordCount = newValue.trim().split(/\s+/).length;
    var message = 'Word Count: ' + (newValue ? wordCount : 0);
    var messageType = (wordCount > 150) ? 'error' : 'info';

    g_form.showFieldMsg('description', message, messageType);
}
