// Check if the incident has been unassigned for more than 5 days
var unassignedDuration = gs.daysAgo(current.sys_created_on);
if (unassignedDuration < 5) {
    gs.addErrorMessage("The incident has been unassigned for less than 5 days.");
    action.setRedirectURL(current);
    return;
}

// Check if the incident has an assignment group
if (current.assignment_group.nil()) {
    gs.addErrorMessage("No assignment group is set for this incident.");
    action.setRedirectURL(current);
    return;
}

// Get the assignment group's manager
var assignmentGroup = new GlideRecord('sys_user_group');
if (assignmentGroup.get(current.assignment_group)) {
    var manager = assignmentGroup.getValue('manager');

    if (manager) {
        // Create a notification
        var notification = new GlideEmailOutbound();
        notification.setFrom('no-reply@xyz.com');
        notification.setSubject("Alert! Incident " + current.number + " is still unassigned");
        notification.setBody("The incident " + current.number + " has been unassigned for more than 5 days. Please assign it promptly.");
        notification.setTo(manager);

        // Send the email
        notification.send();

        gs.addInfoMessage("Notification sent to the assignment group's manager.");
    } else {
        gs.addErrorMessage("The assignment group has no manager defined.");
    }
} else {
    gs.addErrorMessage("Could not find the assignment group.");
}

action.setRedirectURL(current);
