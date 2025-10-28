
/**********************************************************************************************************************
Create a Script Include:
Name: emailAsAttachmentUtil
Accessible from: All application Scopes = this will allow it to be called by all applications
Active: checked
Description: You may want to set the description to something like the following to document what this script includes does and how to call it


This utility script will take contents from an inbound email and create an attachment on the created record from the inbound email action.  To utilize this script, add the following lines at the end of the inbound email action script:
var emailAsAttachment = new global.emailAsAttachmentUtil();
emailAsAttachment.createAttachment(email, current);
***********************************************************************************************************************/

var emailAsAttachmentUtil = Class.create();
emailAsAttachmentUtil.prototype = {
    initialize: function() {
		this.newLineChar = "\r\n";  // Microsoft Windows expects \r and \n for return and new line
		this.contentType = "text/plain";
    },
	
	createAttachment: function (emailRec, currentRec) {
		var fileName = emailRec.subject + '.eml';
		
		// Setup array to push email values into.  Add additional as needed/
		var emailData = [];
		emailData.push("To: " + emailRec.to);
		emailData.push("Subject: " + emailRec.subject);
		emailData.push("From: " + emailRec.origemail);
		emailData.push(emailRec.body_text);
		
		// Convert emailData to a string separated by new line character.
		var emailString = emailData.join(this.newLineChar);
		
		// Create attachment with email string and attach it to the record creatd by the email.
		var sysAttachment = new GlideSysAttachment();
		sysAttachment.write(currentRec, fileName, this.contentType, emailString);
	},

    type: 'emailAsAttachmentUtil'
};


/**********************************************************************************************************************
Navigate to System Policy \ Email \ Inbound Actions and open the one that you want to capture the contents of the email as an attachment.
Go to the Actions Tab and scroll to the bottom of the script and paste in the following:
***********************************************************************************************************************/

var emailAttachment = new global.emailAsAttachmentUtil();
emailAttachment.createAttachment(email, current);
