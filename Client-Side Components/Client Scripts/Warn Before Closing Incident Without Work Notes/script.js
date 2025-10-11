function onSubmit() {
    var state = g_form.getValue('state');
    var workNotes = g_form.getValue('work_notes');

    // Check if state is Resolved (6) or Closed (7) and work notes are empty
    if ((state == '6' || state == '7') && !workNotes.trim()) {
        alert("Please add work notes before resolving or closing the Incident.");
        return false; // Prevent form submission
    }

    return true; // Allow submission
}
