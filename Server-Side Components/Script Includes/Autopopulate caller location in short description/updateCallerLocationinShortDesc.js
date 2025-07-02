function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    var ga = new GlideAjax('getCallerLocation'); //Script include function call
    ga.addParam('sysparm_name', 'getLocation');
    ga.addParam('sysparm_user', newValue);
    ga.getXML(setLocation);
}

function setLocation(response) {
	var answer = response.responseXML.documentElement.getAttribute("answer");
    g_form.setValue('short_description',answer);
}
