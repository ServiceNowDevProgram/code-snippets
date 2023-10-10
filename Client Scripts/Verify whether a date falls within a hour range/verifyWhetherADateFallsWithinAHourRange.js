/**
 * Verify whether a date falls within a hour range
 */
function onChange() {
  var dateNow = new Date();
	var dateOpenedAt = new Date(g_form.getValue('opened_at'));
	var differenceInMilliseconds = dateOpenedAt.getTime() - dateNow.getTime();
	var differenceInHours = diffInMs / (1000 * 60 * 60);
	
	if (differenceInHours < 24) {
	  g_form.showFieldMsg('opened_at', 'Please choose a date and time that is at least 24 hours in the future.');
		return false;
	}
	
	return true;
}
