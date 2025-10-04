function onSubmit() {
	if (g_scratchpad.isFormValid) {
		return true;
	}

	var actionName = g_form.getActionName();
	var ga = new GlideAjax('scriptIncludeName');
	ga.addParam('sysparm_name', 'methodName');
	ga.addParam('sysparm_additional_parm', 'parmValue');
	ga.getXMLAnswer(function (answer) {
		if (answer == 'true') {
			g_scratchpad.isFormValid = true;
			// It will trigger the same UI action that was used to submit the form
			g_form.submit(actionName);
		}
	});

	return false;
}