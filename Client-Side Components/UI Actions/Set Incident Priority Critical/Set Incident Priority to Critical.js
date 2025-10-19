function test() {
    // Check if incident is already Critical
    if (g_form.getValue('priority') == '1') {
        alert("This incident is already Critical. No changes were made.");
        return;
    }

    // Show confirmation dialog
    var proceed = confirm("Are you sure you want to set this incident as Critical?");
    if (!proceed) return;

    // Set fields on the form
    g_form.setValue('impact', 1); // High impact
    g_form.setValue('urgency', 1); // High urgency
    g_form.setValue('priority', 1); // Critical
    g_form.setValue('assigned_to', g_user.userID);

    // Append note to description
    var currentDesc = g_form.getValue('description') || '';
    var note = "Priority set to Critical by " + g_user.getFullName() + " at " + new Date().toLocaleString();
    g_form.setValue('description', currentDesc + "\n" + note);

    // Feedback message
    g_form.addInfoMessage("Incident marked as Critical. Remember to save or update the record.");
}
