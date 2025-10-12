function onLoad() {
    var fieldName = 'description';

    // Clear any existing messages on load
    g_form.hideFieldMsg(fieldName, true);

    g_form.getControl(fieldName).addEventListener('input', function() {
        var fieldValue = g_form.getValue(fieldName).trim();
        var wordCount = fieldValue ? fieldValue.split(/\s+/).length : 0;
        
        var message = 'Word Count: ' + wordCount;
        var type = (wordCount > 150) ? 'error' : 'info';  // red for error, greenish for info
        
        // Clear previous message before showing new one
        g_form.hideFieldMsg(fieldName, true);
        
        g_form.showFieldMessage(fieldName, message, type);
    });
}
