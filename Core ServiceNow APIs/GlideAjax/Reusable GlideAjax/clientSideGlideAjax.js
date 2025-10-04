function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var g_ajax = new GlideAjax('scope.ScriptIncludeName'); // pass name of Client callable script include
    g_ajax.addParam('sysparm_name', 'scriptIncludeFunctionName'); // pass function name which will return result
    g_ajax.addParam('sysparm_table', 'table_name'); // e.g. incident
    g_ajax.addParam('sysparm_query', 'anyencodedQueryString'); // e.g. 'number=INC0000010'
    g_ajax.addParam('sysparm_returnAttributes', 'column1,column2'); // e.g. caller_id,assigned_to
    g_ajax.getXMLAnswer(callbackFunctionName);

    function callbackFunctionName(response) {
        var answer = JSON.parse(response);
        g_form.setValue('variable1', answer.column1);
        g_form.setValue('variable2', answer.column2);
    }

}
