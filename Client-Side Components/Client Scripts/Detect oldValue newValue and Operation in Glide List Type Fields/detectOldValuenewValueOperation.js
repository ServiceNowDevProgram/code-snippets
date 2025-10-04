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

    var ajaxGetNames = new GlideAjax('watchListCandidatesUtil');
    ajaxGetNames.addParam('sysparm_name', 'getWatchListUsers');
    ajaxGetNames.addParam('sysparm_old_values', oldGlideValue);
    ajaxGetNames.addParam('sysparm_new_values', newGlideValue);
    ajaxGetNames.getXMLAnswer(function(response) {

        var result = JSON.parse(response);

        g_form.clearMessages();
        g_form.addSuccessMessage('Operation Performed : ' + operation);
        g_form.addSuccessMessage('OldValue : ' + result.oldU);
        g_form.addSuccessMessage('NewValue : ' + result.newU);

    });

}
