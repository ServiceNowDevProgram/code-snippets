function onSubmit() {
    //Type appropriate comment here, and begin script below
    var description = g_form.getValue('description');
	var state = g_form.getValue('state');

    if ((!description) && (state == 'completed')) {
        g_form.addErrorMessage('Please provide Description Value, Description Cannot be empty');

        return false;
    }

}
