Reusable GlideAjax Example
When you need a client side script to contact the server and return few values from a table record matching your query. You can use this reusable GlideAjax code.

**An Example**
Need user fields like manager, Phone, Email matching sys_id of user:
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var g_ajax = new GlideAjax('ScriptIncludeName'); // pass name of Client callable script include name
    g_ajax.addParam('sysparm_name', 'scriptIncludeFunctionName'); // pass function name which will return result
    g_ajax.addParam('sysparm_table', 'sys_user'); 
    g_ajax.addParam('sysparm_query', 'sys_id='+g_form.getValue('requested_for')); 
    g_ajax.addParam('sysparm_returnAttributes', 'manager,email,phone'); 
    g_ajax.getXMLAnswer(callbackFunctionName);

    function callbackFunctionName(response) {
        var answer = JSON.parse(response);
        g_form.setValue('user_manager', answer.manager);
        g_form.setValue('email', answer.email);
        g_form.setValue('phone', answer.phone);
    }
}
