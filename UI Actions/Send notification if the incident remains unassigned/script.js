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
    var manager = assignmentGroup.getValue('manager'); // Fetches the sys_id of the manager field

    if (manager) {
var userGR = new GlideRecord('sys_user'); // Access the sys_user table
    var managerEmail = "";
    if (userGR.get(assignedToEmail)) {
        managerEmail = userGR.getValue('email'); // Retrieves the email field from the sys_user record
    }
if (managerEmail)
{
 // Create a notification
   var gr_sys_email = new GlideRecord('sys_email');
        gr_sys_email.initialize();
        gr_sys_email.setValue('type', 'send-ready');
        gr_sys_email.setValue('subject', "Incident " + current.number + " is still unassigned");
        gr_sys_email.setValue('recipients', managerEmail);
        gr_sys_email.setValue('body', "The incident " + current.number + " has been unassigned for more than 5 days. Please assign it promptly.");
        gr_sys_email.insert();
}
        gs.addInfoMessage("Notification about incident unassigned is sent to the assignment group's manager.");
    } else {
        gs.addErrorMessage("The assignment group has no manager defined.");
    }
} else {
    gs.addErrorMessage("The incident has no assignment group.");
}

action.setRedirectURL(current);
