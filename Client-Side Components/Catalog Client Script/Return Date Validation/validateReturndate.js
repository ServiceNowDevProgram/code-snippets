function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var u_start_date = g_form.getValue('u_start_date');  //start date validation to check to see whether filled or not
    if (!u_start_date) {
        g_form.clearValue('u_return_date');
		    g_form.showFieldMsg('u_return_date', 'Please enter start date', 'error');
    } else {
    		var startTime = getDateFromFormat(u_start_date, g_user_date_format);   //converting to js date object
    		var returnTime = getDateFromFormat(newValue, g_user_date_format);
    		var selectedStartDate = new Date(startTime);
    		var returnDate = new Date(returnTime);
    		var returnDateDifference = (returnDate - selectedStartDate) / 86400000; //converting the diff between the dates to days by dividing by 86400000 
    		if (returnDateDifference > 180) {
      			g_form.clearValue('u_return_date');
      			g_form.showFieldMsg('u_return_date', 'Select Return Date within 6 months from Start Date', 'error');
    		} else if (returnDateDifference < 1) {
      			g_form.clearValue('u_return_date');
      			g_form.showFieldMsg('u_return_date', 'Select Return Date in future than Start Date', 'error');
		    }
	  }
}
