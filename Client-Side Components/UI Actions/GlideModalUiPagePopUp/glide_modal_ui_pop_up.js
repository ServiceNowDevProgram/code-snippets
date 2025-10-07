function onClick(g_form) {
    // Check if the current user is the assigned user
    if (g_user.userID != g_form.getValue('assigned_to')) {
        // Alert if the user is not the assigned user
        g_modal.alert('Only the assigned user can perform this action.');
        return;
    }

    // Confirmation message
    var msg = getMessage("Are you sure you want to take this action?");
    
    // Confirmation modal before closing the task
    g_modal.confirm(getMessage("Confirmation"), msg, function (confirmed) {
        if (confirmed) {
            // If confirmed, close the task
            g_form.setValue('state', 'closed_complete');
            g_form.save();
        }
    });

    return false;
}
