//onChange client script

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        
        return;
    }


    //Type appropriate comment here, and begin script below
    var ga = new GlideAjax('getSIRDetails'); // calling script include
    ga.addParam('sysparm_name', 'getDetails');
    ga.addParam('sysparm_sir', newValue); //passing newValue to the script include
    ga.getXMLAnswer(callBackFunction);


    function callBackFunction(response) {
        var ans = JSON.parse(response);
        g_form.setValue('severity', ans.severity); // setting values from the obj to appropriate fields
        g_form.setValue('soc_sir_state', ans.state);
        g_form.setValue('soc_sir_assigned_to', ans.assignedto);


    }
}
