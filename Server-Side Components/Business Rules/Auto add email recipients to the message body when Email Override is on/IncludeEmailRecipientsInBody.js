//Name: Include email recipients in body
//Table: Email (sys_email)
//When: Before
//Insert: true
//Update: true
//Condition: Type is "send-ready"

function onBefore(current, previous) {
	//Add the recipients to the body of the email so that testers can see who the email was meant for.
	var recipients = "\n*****\nEmail override is on.  All outbound emails are currently sent to: " + gs.getProperty("glide.email.test.user");
	recipients += "\nOriginal Intended Recipients: ";
	if (current.direct != "") {
		recipients += "\nTO: " + current.direct;
	}
	if (current.copied != "") {
		recipients += "\nCC: " + current.copied;
	}
	if (current.blind_copied != "") {
		recipients += "\nBCC: " + current.blind_copied;
	}
	recipients += "\n*****\n";
	
	current.body_text = current.body_text + "\n\n\n*****\n" + recipients + "\n*****\n";
	current.body = current.body + "<html><body><div><br />" + recipients.replace(/\r\n|[\r\n]/g, "<br /></div></body></html>");
}
