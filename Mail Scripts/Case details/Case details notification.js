(function runMailScript(current, email, email_action, event) {
    var gr = new GlideRecord('sn_customerservice_case'); // Replace with case table name)
    var caseLink = '<a href="' + current.getLink() + '" style="font-weight: bold;">' + current.number + '</a>'; // Creates a clickable link to the case record
    var subject = 'Added to case ' + current.number; // Sets the subject with the current case number
    email.setSubject(subject);

    // Querying for the case record
    gr.addQuery('sys_id', current.sys_id);
    gr.query();

    // Get the reference to the user 
       var firstName = event.parm2; // Retrieve the first name from the event

       // Ensure proper greeting format
firstName = firstName ? firstName : "Team"; // Default to "Team" if no first name

    // Top Banner
    var banner =
        '<div class="banner" style="background-color: #000000; color: white; padding-top: 0px; padding-left: 10px; text-align: left; border-bottom: 5px solid gold; border-radius: 5px;">' +
        '<span style="font-family: Arial, Helvetica, sans-serif; font-size: 12pt;">' +
        // Creates a clickable logo. Insert a hover title and destination URL
        '<a title="Hover title" href="https://www.designation.com">' + 
        '<img src="imagename.png" width="168" height="56" />' + // Image name from System UI>Images table
        '</a>' +
        '</span>' +
        '</div>';

    var emailBody = banner;

    // Body font style
    emailBody +=
        '<div style="font-family: Arial, sans-serif; font-size: 16px; color: black;">' +
        '<p>Hello ' + firstName + ',<br><br>' +  
        'You have been added to case ' + caseLink + '\'s watch list. Click the link to view the case details.</p>' +  

        '<table style="width: 100%;">';

    if (gr.next()) {
        // Display description and location (replace with field names you want to display)
        emailBody += '<tr>';
        emailBody += '<td style="width: 120px; padding-left: 20px; padding-right: 0px; font-weight: bold; text-align: left;">Description:</td>'; // Replace "Description"
        emailBody += '<td style="padding-left: 0px;">' + gr.description + '</td>'; // Replace "description"
        emailBody += '</tr>';

        emailBody += '<tr>';
        emailBody += '<td style="width: 120px; padding-left: 20px; padding-right: 0px; font-weight: bold; text-align: left;">Location:</td>'; // Replace "Location"
        emailBody += '<td style="padding-left: 0px;">' + gr.location.getDisplayValue() + '</td>'; // Replace "location"
        emailBody += '</tr>';

        // Query for attachments related to this case
        var attachmentGr = new GlideRecord('sys_attachment');
        attachmentGr.addQuery('table_sys_id', current.sys_id);
        attachmentGr.query();

        // Insert attachments from the case
        if (attachmentGr.hasNext()) {
            emailBody += '<tr>';
            emailBody += '<td style="width: 120px; padding-left: 20px; padding-right: 0px; font-weight: bold; text-align: top; vertical-align: top;">Images:</td>'; 
            emailBody += '<td style="padding-left: 0px;">';

            while (attachmentGr.next()) {
                var attachmentLink = gs.getProperty('glide.servlet.uri') + 'sys_attachment.do?sys_id=' + attachmentGr.sys_id;
                var fileName = attachmentGr.file_name;

                // Check if the file is an image
                if (attachmentGr.content_type.startsWith('image/')) {
                    emailBody += '<p style="margin-bottom: 10px;"><img src="' + attachmentLink + '" alt="' + fileName + '" style="max-width: 400px;"></p>';
                } else {
                    emailBody += '<p><a href="' + attachmentLink + '" target="_blank">' + fileName + '</a></p>';
                }
            }

            emailBody += '</td>';
            emailBody += '</tr>';

        // If there are no attachments
        } else {
            emailBody += '<tr><td colspan="2" style="padding-left: 20px;"><b>No attachments found for this case.</b></td></tr>';
        }
    
    // If there are no details    
    } else {
        emailBody += '<tr><td colspan="2" style="padding-left: 10px;">No matching case details found.</td></tr>';
    }

    // Close the table
    emailBody += '</table>';

    // Closing the email body
    emailBody += '<p>Best regards,<br>(name)</p>'; // Replace name
    emailBody += '</div>';

    // Bottom banner
    var bottombanner =
        '<div class="bottom-banner" style="' +
        'background-color: #000000;' +
        'height: 10px;' +
        'border-top: 4px solid gold;' +
        'border-radius: 5px;' +
        'margin-top: 20px;' +
        '"></div>';

    // Add the bottom banner to the email body
    emailBody += bottombanner;

    // Print the email body
    template.print(emailBody);

})(current, email, email_action, event);

