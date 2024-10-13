function onClick(g_form) {
    // Check if the current user is the assigned user for the task
    if (g_user.userID != g_form.getValue('assigned_to')) {
        // Show an alert if the user is not the assigned user
        g_modal.alert('Only the assigned to can end this action.');
        return; // Exit the function to prevent further execution
    }

    // Prepare the confirmation message
    var msg = getMessage("Are you sure you want to take this action?");
    
    // Show the confirmation dialog to the user
    g_modal.confirm(getMessage("Confirmation"), msg, function (confirmed) {
        // If the user clicks OK
        if (confirmed) {
            // Set the state of the record to 'closed_complete'
            g_form.setValue('state', 'closed_complete');
            // Save the form changes
            g_form.save();
        }
    });

    return false; // Prevent default action
}
