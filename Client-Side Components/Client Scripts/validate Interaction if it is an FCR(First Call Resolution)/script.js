//Client Script to validate an Interaction record is resolved with out any related record created.
function onSubmit() {
    var relatedTask = g_form.getValue('u_boolean_no_related_task');
    var state = g_form.getValue('state');
    var type = g_form.getValue('type');
    var workNotes = g_form.getValue('work_notes'); // Get the value of work notes

    // Clear previous field messages
    g_form.clearMessages();

    // Check if state is changing to 'Closed Complete'
    if (state == 'closed_complete') {
        // Check additional conditions
        if (type == 'walkup' && relatedTask == 'true') {
            return true; // Allow form submission
        } else if (!workNotes) { // Check if work notes is empty
            g_form.showFieldMsg('work_notes', 'Provide Worknotes for FCR Interaction', 'error');
			alert('Provide Worknotes for FCR Interaction');
            return false; // Prevent form submission
        }
    }
    return true; // Allow form submission for other states
}
