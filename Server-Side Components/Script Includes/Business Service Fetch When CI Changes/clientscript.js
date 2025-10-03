/**onChange Client Script on Change_Request form when CI changes */

function onchange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    var ga = new GlideAjax('getServiceDetails');
    ga.addParam('sysparm_name', 'getService');
    ga.addParam('sysparm_ci_sys_id', newValue);
    ga.getXML(callScriptInclude);

    function callScriptInclude(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");

        if (answer) {
            // Set the Business Service field with the service name returned
            g_form.setValue('business_service', answer);
        } else {
            // Optional: show a message if no service is found
            g_form.showFieldMsg('business_service', 'No linked Business Service found for this CI.', 'info');
        }
    }
}
