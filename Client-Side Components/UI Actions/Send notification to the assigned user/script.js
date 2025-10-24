//Servver Side Script to send notification to the assigned to user
var assignedToEmail = current.getValue('assigned_to'); // Fetches the sys_id of the assigned_to field
if (assignedToEmail) {
    var userGR = new GlideRecord('sys_user'); // Access the sys_user table
    var txt_email = "";
    if (userGR.get(assignedToEmail)) {
        txt_email = userGR.getValue('email'); // Retrieves the email field from the sys_user record
    }
    if (txt_email) {
        var gr_sys_email = new GlideRecord('sys_email');
        gr_sys_email.initialize();
        gr_sys_email.setValue('type', 'send-ready');
        gr_sys_email.setValue('subject', 'UI Action Notification from Incident ' + current.number);
        gr_sys_email.setValue('recipients', txt_email);
        gr_sys_email.setValue('body', 'As the incident ' + current.number + ' is assigned to you, this UI Action Notification has been sent. Please review the incident.');
        gr_sys_email.insert();
    }
	else
	{
			gs.addInfoMessage("The email address for the user " + userGR.getValue('name') + " is missing. As a result, the email could not be sent.");
	}
}
else
{
	gs.addInfoMessage("The incident " + current.number + " has not been assigned to any user. Therefore, the email could not be sent.");
}
