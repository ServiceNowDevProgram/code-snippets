function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    var fieldName = 'name';

    var maxLength = g_form.getControl(fieldName).getAttribute('maxlength');
    if (maxLength) {
        
        var remaining = maxLength - newValue.length;
        var message = 'Remaining characters: ' + remaining;

        // Clear previous messages to avoid duplication.
        g_form.hideFieldMsg(fieldName);

        if (remaining <= 10 && remaining >= 0) {
            g_form.showFieldMsg(fieldName, message, 'warning');
        } else if (remaining < 0) {
            g_form.showFieldMsg(fieldName, 'Maximum characters exceeded!', 'error');
        } else {
            g_form.showFieldMsg(fieldName, message, 'info');
        }
    }



}
