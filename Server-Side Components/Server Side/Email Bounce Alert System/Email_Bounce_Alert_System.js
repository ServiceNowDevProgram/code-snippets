// 📧 Email Bounce Alert Script
// --------------------------------------------------------------
// Purpose:
// This mail script detects bounced-back emails in the Junk module
// and identifies recipient addresses from the email body.
//
// When a bounce is detected, it automatically triggers a notification
// containing the affected email IDs and a link to the email record.
//
// Type: Email Script
// Trigger: Notification 

(function runMailScript(current, template, email, email_action, event) {

    // --- Step 1: Function to extract email addresses from email body ---
    function extractEmails(html) {
        // Regular expression to match email patterns
        var emailPattern = /[\w\-]+@[\w\-]+/g;

        // Find all matching email addresses in the body
        var emails = html.match(emailPattern);

        // Return the array of emails or an empty array if none found
        return emails || [];
    }

    // --- Step 2: Convert the email body into plain text ---
    var body = current.body.toString().replaceAll('"', '');

    // --- Step 3: Extract email addresses from the content ---
    var extractedEmails = extractEmails(body);

    // --- Step 4: Build the notification message ---
    template.print("This alert has been generated because a bounced email incident may have occurred due to possible IP blacklisting."); //example: IP blacklisting use case
    template.print("<br><strong>User(s) who missed the email:</strong> " + extractedEmails.join(', '));
    template.print("<br><strong>Link to the bounced email record:</strong> ");
    template.print('<a href="' + gs.getProperty('glide.servlet.uri') + 'sys_email.do?sys_id=' + current.sys_id + '">Click here</a>');

})(current, template, email, email_action, event);
