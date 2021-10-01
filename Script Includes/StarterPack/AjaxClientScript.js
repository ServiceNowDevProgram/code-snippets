    function onChange(control, oldValue, newValue, isLoading) {
        if (isLoading || newValue == '') {
            return;
        }

        var ga = new GlideAjax('StarterPackAjax'); //Script include name
        ga.addParam('sysparm_name', 'getUserInfo'); //Function within the Script Include Name
        ga.addParam('sysparm_id', g_form.getValue('caller_id')); //Parameter to pass to the Script Include, in this case a field called 'caller_id'
        ga.getXML(getParse);
    }

function getParse(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    if (answer) {
        var data = JSON.parse(answer);
        g_form.setValue('location', data.location); // Set values that were returned from the Script Include
        g_form.setValue('manager', data.manager);
    }
}
