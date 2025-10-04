function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading) {
        return;
    }


    var prevValue;
    if (g_scratchpad.prevValue == undefined)
        prevValue = oldValue;
    else {
        prevValue = g_scratchpad.prevValue;
    }
    g_scratchpad.prevValue = newValue;


    var oldGlideValue = prevValue.split(',');
    var newGlideValue = newValue.split(',');


    var operation;

    if (oldGlideValue.length > newGlideValue.length || newValue == '') {
        operation = 'remove';
    } else if (oldGlideValue.length < newGlideValue.length || oldGlideValue.length == newGlideValue.length) {
        operation = 'add';
    } else {
        operation = '';
    }

    g_form.clearMessages();
    g_form.addSuccessMessage('Operation Performed : ' + operation);
    g_form.addSuccessMessage('OldValue : ' + oldGlideValue);
    g_form.addSuccessMessage('newValue : ' + newGlideValue);

}
