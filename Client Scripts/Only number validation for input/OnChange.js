function onChange(control, oldValue, newValue, isLoading) {
			
	if (isLoading || newValue === '') {
		return;
	}

    // Change the name of the field to your field name
    var FIELD_NAME = '<your field name>'; 

	// allow number only
	var reg = new RegExp(/^\d+$/);
	
	if (!reg.test(newValue)) {
		g_form.hideFieldMsg(FIELD_NAME);
		g_form.showFieldMsg(FIELD_NAME, g_form.getLabelOf(FIELD_NAME) + ' may contain digits only.', 'error');
		
	} else {
		g_form.hideFieldMsg(FIELD_NAME);
	}
}