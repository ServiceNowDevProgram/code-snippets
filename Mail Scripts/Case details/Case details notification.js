(function runMailScript(current, email, email_action, event) {
    // Store frequently used `current` values in variables to avoid multiple calls
    var caseSysId = current.getValue('sys_id');
    var caseNumber = current.getValue('number');
    var caseLink = '<a href="' + current.getLink() + '" style="font-weight: bold;">' + caseNumber + '</a>';

    // Retrieve the first name from the event parameter, defaulting to "Team" if missing
    var firstName = event.parm2 || "Team";

    // Top banner HTML
    var banner = 
        '<div class="banner" style="background-color: #000000; color: white; padding-top: 0px; padding-left: 10px; text-align: left; border-bottom: 5px solid gold; border-radius: 5px;">' +
        '<span style="font-family: Arial, Helvetica, sans-serif; font-size: 12pt;">' +
        '<a title="Hover title" href="https://www.designation.com">' +
        '<img src="imagename.png" width="168" height="56" />' + 
        '</a>' +
        '</span>' +
        '</div>';

    // Initialize email body with banner
    var emailBody = banner +
        '<div style="font-family: Arial, sans-serif; font-size: 16px; color: black;">' +
        '<p>Hello ' + firstName + ',<br><br>' +
        'You have been added to case ' + caseLink + '\'s watch list. Click the link to view the case details.</p>' +
        '<table style="width: 100%;">';

    // Case record processing
    var gr = new GlideRecord('sn_customerservice_case');
    if (gr.get(caseSysId)) {
        // Using getValue() for fields to ensure direct string handling
        emailBody += '<tr><td style="width: 120px; padding-left: 20px; font-weight: bold; text-align: left;">Description:</td>';
        emailBody += '<td>' + gr.getValue('description') + '</td></tr>';

        emailBody += '<tr><td style="width: 120px; padding-left: 20px; font-weight: bold; text-align: left;">Location:</td>';
        emailBody += '<td>' + gr.getDisplayValue('location') + '</td></tr>';

        // Retrieve attachments associated with the case
        var attachmentGr = new GlideRecord('sys_attachment');
        attachmentGr.addQuery('table_sys_id', caseSysId);
        attachmentGr.query();

        // Attachments section
        if (attachmentGr.hasNext()) {
            emailBody += '<tr><td style="width: 120px; padding-left: 20px; font-weight: bold; text-align: top; vertical-align: top;">Images:</td>';
            emailBody += '<td>';
            
            while (attachmentGr.next()) {
                var attachmentLink = gs.getProperty('glide.servlet.uri') + 'sys_attachment.do?sys_id=' + attachmentGr.getValue('sys_id');
                var fileName = attachmentGr.getValue('file_name');

                // Display image if applicable, otherwise show a link
                if (attachmentGr.getValue('content_type').startsWith('image/')) {
                    emailBody += '<p><img src="' + attachmentLink + '" alt="' + fileName + '" style="max-width: 400px;"></p>';
                } else {
                    emailBody += '<p><a href="' + attachmentLink + '" target="_blank">' + fileName + '</a></p>';
                }
            }
            emailBody += '</td></tr>';
        } else {
            emailBody += '<tr><td colspan="2" style="padding-left: 20px;"><b>No attachments found for this case.</b></td></tr>';
        }
    } else {
        emailBody += '<tr><td colspan="2" style="padding-left: 10px;">No matching case details found.</td></tr>';
    }

    // Closing the table and email body
    emailBody += '</table>';
    emailBody += '<p>Best regards,<br>(name)</p>';
    emailBody += '</div>';

    // Bottom Banner HTML
    var bottombanner = 
        '<div class="bottom-banner" style="background-color: #000000; height: 10px; border-top: 4px solid gold; border-radius: 5px; margin-top: 20px;"></div>';

    // Append bottom banner to the email body
    emailBody += bottombanner;

    // Output the email body
    template.print(emailBody);

})(current, email, email_action, event);
