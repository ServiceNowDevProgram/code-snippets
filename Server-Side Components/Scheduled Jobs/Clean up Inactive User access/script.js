///This is a Scheduled Job Script to be added in "Run this script" 
//replace the email in line 56- 'email.setFrom('xyz@service-now.com');'
//replace the property name in line 44 'var recipientList = gs.getProperty('glide.xyz.admin.email.recipients');'

var emailBody = 'Daily Inactive User Group/Role/Task Clean-up Completed: \n<br><br>';

//REMOVE INACTIVE USERS FROM GROUPS
var queryString = "user.active=false^user.web_service_access_only=false^user.sourceSTARTSWITHldap:"; //query to find inactive members belonging to groups and ignores any users with "web service access only" = TRUE.
var recGrp = new GlideRecord('sys_user_grmember'); //searches the User Group Member table
recGrp.addEncodedQuery(queryString);
recGrp.query();
while (recGrp.next()) {
    emailBody += 'Inactive User, ' + recGrp.user.getDisplayValue() + ', member of Group: ' + recGrp.group.getDisplayValue() + ' was removed from Group.\n<br>';
    gs.log('Inactive User, ' + recGrp.user.getDisplayValue() + ', member of Group: ' + recGrp.group.getDisplayValue() + ' was removed from Group.');
    recGrp.deleteRecord(); //deletes group membership record from inactive user
}

//REMOVE ROLES FROM INACTIVE USERS THAT WERE NOT ADDED BY GROUP MEMBERSHIP
var recRole = new GlideRecord('sys_user_has_role'); // search view User Has Role table
var queryString2 = "user.active=false^user.web_service_access_only=false^user.sourceSTARTSWITHldap:^inherited=false";
recRole.addEncodedQuery(queryString2); // find inactive users that have a role assigned and ignores any users with "web service access only" = TRUE.
recRole.query();
while (recRole.next()) {
    emailBody += 'Inactive User, ' + recRole.user.name + ' found - Role: ' + recRole.role.getDisplayValue() + ', was removed.\n<br>';
    gs.log('Inactive User, ' + recRole.user.name + ' found - Role: ' + recRole.role.getDisplayValue() + ', was removed.'); // add info message to system log about what user was inactive and role was removed
    recRole.deleteRecord(); //deletes role record from inactive user
}

//CLEARS ASSIGNED TO ON ACTIVE TASKS ASSIGNED TO INACTIVE USERS
var recTask = new GlideRecord('task'); // search task table
var queryString3 = "assigned_to.active=false^assigned_to.web_service_access_only=false^active=true";
recTask.addEncodedQuery(queryString3); // find inactive users that have active tasks assigned to them and ignores any users with "web service access only" = TRUE.
recTask.query();
while (recTask.next()) {
    emailBody += 'Removed task from Inactive User: ' + recTask.assigned_to.getDisplayValue() + ' ' + recTask.number + '.\n<br>';
    gs.log('Removed task from Inactive User: ' + recTask.assigned_to.getDisplayValue() + ' ' + recTask.number); // add message about what user was inactive tasks removed
    recTask.work_notes = 'System Administrator removed "Assigned to" value as the user is no longer active.'; //add work note explanation without workflow
    recTask.update();
    recTask.assigned_to = '';
    recTask.setWorkflow(false); //removes assigned_to value without workflow
    recTask.update();
}

var recipientList = gs.getProperty('glide.xyz.admin.email.recipients');
var email = new GlideEmailOutbound();
email.setSubject('Daily Inactive User Group/Role/Task Clean-up Completed');
email.setBody(emailBody);
if (recipientList.includes(',')) {
    var recipients = recipientList.split(",");
    for (var i = 0; i < recipients.length; i++) {
        email.addRecipient(recipients[i]); // Add recipients from system property
    }
} else {
    email.addRecipient(recipientList); // Add single recipient from system property
}
email.setFrom('xyz@service-now.com');
email.save();

gs.log('Daily Inactive User Group/Role/Task Clean-up Completed: \n\n' + emailBody);
