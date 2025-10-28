(function executeRule(current, previous /*null when async*/ ) {

    /*
		Inputs
		1. Opened(opened_at)
		2. Resolved(resolved_at)

		Checks & Validation
		1. It will check the Date/Time validation whether it Resolved time should be greater than Open time 
		2. And it will not calculate the empty values

		Outputs
		1. If everthing has a right value like the Opened < Resolve Date/Time then Duration will be calculated and populated in the respective field
		2. Negative case if Opened > Resolved the duration will not calculate and it will Abort the action to save the record with Error message.
	*/

	// Getting both the date from the record
    var opened = GlideDateTime(current.opened_at.getDisplayValue());
    var resolved = GlideDateTime(current.resolved_at.getDisplayValue());

    //If the opened and resolved times are present, calculate the duration
    if (opened && resolved) {
        var difference = GlideDateTime.subtract(opened, resolved);
        if (difference.getYearUTC() >= 1970)
            current.calendar_duration.setValue(difference);
        else {
            current.calendar_duration.setValue(null);
            current.resolved_at.setValue(null);
            current.setAbortAction(true);
            gs.addErrorMessage("Incident Resolve date/time must be greater than incident Opened date/time");
        }
    }



})(current, previous);