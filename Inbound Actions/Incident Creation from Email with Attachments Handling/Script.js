// Email Inbound Action: Create Incident from Email
(function() {
    var incidentGR = new GlideRecord('incident');
    incidentGR.initialize();
    
    // Set the incident details from the email
    incidentGR.short_description = email.subject; // Use email subject as short description
    incidentGR.description = email.body; // Use email body as description
    incidentGR.caller_id = email.from; // Set caller from the email sender

    // Insert the new incident and capture the sys_id
    var incidentID = incidentGR.insert();

    // Handle attachments
    var attachments = email.attachments;
    if (attachments) {
        for (var i = 0; i < attachments.length; i++) {
            var attachmentGR = new GlideRecord('sys_attachment');
            attachmentGR.initialize();
            attachmentGR.table_name = 'incident'; // Link to the incident table
            attachmentGR.table_sys_id = incidentID; // Link to the newly created incident
            attachmentGR.file_name = attachments[i].file_name; // Attach the file name
            attachmentGR.content_type = attachments[i].content_type; // Attach the content type
            attachmentGR.insert(); // Save the attachment
        }
    }
})();
