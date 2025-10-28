function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var sDate = g_form.getValue('start_date'); //this gets the value from your start date field
	if (sDate == '') { //if the start date hasn't been populated then clear the end-date and inform user to please choose a stating date first
		g_form.clearValue('end_date');
		g_form.showFieldMsg('end_date', "Please choose a starting date first");
	}
    if (newValue < sDate) { //if the end date is before the start date, clear the field value, and inform the user that the end date cannot be before the start date
        g_form.clearValue('end_date');
		g_form.showErrorBox('end_date', "End date cannot be before the Start date");
    }
}
