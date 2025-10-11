//Prompts confirmation window on click
function ReqWarning() {
    var answer = confirm("Please confirm Request to Incident Action. \n This will set the current Request to 'Closed Skipped' and create a new Incident.");

    if (answer == false) {
        return false;
    }

    gsftSubmit(null, g_form.getFormElement(), 'create_inc_cancel_req');

}

// Ensure this runs on the server side
if (typeof current != 'undefined') {
    // Create a new incident record
    var inc = new GlideRecord('incident');
    inc.initialize();

    // Map fields from the task to the incident
    inc.short_description = current.short_description;
	inc.description = current.special_instructions;
    inc.caller_id = current.requested_for;
	inc.watch_list = current.watch_list;
	inc.assigned_to = current.assigned_to;
	inc.state = 1; // Sets state to 'New'
	inc.contact_type = 'self-service';
	inc.assignment_group = 'group_sys_id'; // Assign to your preferred assignment group's sys_id

	// Construct the initial work note for the Incident with a link back to the original
	var callerName = current.requested_for.getDisplayValue();
	var currentLink = "[code]<a href='" + current.getLink() + "'>" + current.number + "</a>[/code]";
	var initialJournalEntry = gs.getMessage("This incident was converted from {0} on behalf of {1}" , [currentLink, callerName]);
	inc.work_notes = initialJournalEntry;
	
    // Initialize a variable to compile the work notes and comments
    var compiledEntries = "Compiled Work Notes and Comments:\n=================================\n\n";
	
    // Query combined work notes and comments from the current task
    var journal = new GlideRecord('sys_journal_field');
    journal.addQuery('element_id', current.sys_id);
    journal.addQuery('element', 'IN', 'work_notes,comments'); // Fetch work notes and comments
    journal.orderBy('sys_created_on'); // Ensures chronological order
    journal.query();

    while (journal.next()) {
		var entryType = journal.element == 'work_notes' ? 'Work Note' : 'Comment';
		var entryTimestamp = journal.sys_created_on.getDisplayValue();

		var userRecord = new GlideRecord('sys_user');
		var entryCreatedBy = 'Unknown User';  // Default value in case user is not found

		// Query the sys_user table based on the user_name stored in sys_created_by
		userRecord.addQuery('user_name', journal.sys_created_by);
		userRecord.query();

		if (userRecord.next()) {
			var firstName = userRecord.first_name;
			var lastName = userRecord.last_name;

			// Concatenate first name and last name to form the full name
			entryCreatedBy = firstName + ' ' + lastName;
		}
		var entryText = journal.value;

		// Format the entry with structured and visually separated format
			compiledEntries += entryType + " - " + entryTimestamp + " - " + entryCreatedBy + ":\n" +
							"--------------------------------------------------------\n" +
							"\"" + entryText + "\"\n" +
							"--------------------------------------------------------\n\n";	
	}

    // Add the compiled entries as a work note to the new incident
    if (compiledEntries != "Compiled Work Notes and Comments:\n=================================\n\n") {
        inc.work_notes = compiledEntries;
    }

    // Insert the new incident record to get a sys_id for work notes and comments transfer
    var incSysId = inc.insert();

    // Check if successful incident record creation, set closing fields, and inform user
    if (incSysId) {
		// Set fields on current record
		current.request_state = 'closed_cancelled';
		current.state = 7; // Sets state to 'Closed Skipped'
		var incLink = "[code]<a href='" + inc.getLink() + "'>" + inc.number + "</a>[/code]";
		current.work_notes = gs.getMessage("Converted to Incident: " + incLink);
		current.update();

        gs.addInfoMessage("Incident created from Request: " + inc.number);

		// Redirect to the newly created incident
		action.setRedirectURL(inc);
    } else {
		gs.addErrorMessage("Failed to convert");
	}
}
