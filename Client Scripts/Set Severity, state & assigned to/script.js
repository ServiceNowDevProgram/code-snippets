//onChange client script


function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {


        return;
    }


    //Type appropriate comment here, and begin script below


    var ga = new GlideAjax('getSIRDetails');
    ga.addParam('sysparm_name', 'getDetails');
    ga.addParam('sysparm_sir', newValue);
    ga.getXMLAnswer(callBackFunction);




    function callBackFunction(response) {
        var ans = JSON.parse(response);
        g_form.setValue('severity', ans.severity);
        g_form.setValue('soc_sir_state', ans.state);
        g_form.setValue('soc_sir_assigned_to', ans.assignedto);


    }
}
