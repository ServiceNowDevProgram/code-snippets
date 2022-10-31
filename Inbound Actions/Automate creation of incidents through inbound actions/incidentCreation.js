var recipients= email.recipients;   //get recipients of email.
var recipientsSplit= recipients.split(",");
var finalRecipients="";
// Add execution condition on "When to run" tab. The condition is " User is email address of the alert receiving from." Here User is field on the "sys_email" table
current.caller_id = gs.getUserID();
current.comments = "received from: " + email.origemail + "\n\n" + email.body_text; // update incident comments with email body.
current.short_description = email.subject;
current.business_service = "e32e0a921b223010d1462f8a2d4bcb68";
current.assignment_group = "b5a28e7c1bcc1d50789adbd7b04bcbb9";
current.incident_state = IncidentState.NEW;
current.notify = 2;
current.contact_type = "email";
current.description= email.body_text;
or(var i=0; i<recipientsSplit.length;i++)
{
if(!recipientsSplit[i].includes("service-now.com")){ // exclude service-now instance emails.

	finalRecipients=finalRecipients+","+recipientsSplit[i];
	}

}
current.watch_list = finalRecipients;// update current incident with reciepients as watch_list members
current.insert();
