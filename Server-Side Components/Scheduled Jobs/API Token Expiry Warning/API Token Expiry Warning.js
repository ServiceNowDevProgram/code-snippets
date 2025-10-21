(function() {

    // Configuration via system properties
    var warningDays = parseInt(gs.getProperty('api.token.expiry.warning.days', '7'), 10); // Days before expiry to warn
    var emailRecipients = gs.getProperty('api.token.expiry.email.recipients', 'admin@example.com'); // Comma-separated emails

    // Current time and warning threshold time
    var now = new GlideDateTime();
    var warningDate = new GlideDateTime();
    warningDate.addDays(warningDays);

    // Query oauth_credential records with expires_on between now and warningDate
    var gr = new GlideRecord('oauth_credential');
    gr.addQuery('expires_on', '>=', now);
    gr.addQuery('expires_on', '<=', warningDate);
    gr.addQuery('active', '=', true); // Only active tokens
    gr.orderBy('expires_on');
    gr.query();

    if (!gr.hasNext()) {
        gs.info('No OAuth credentials nearing expiry within ' + warningDays + ' days.');
        return;
    }

    // Build notification email body
    var emailBody = '<h3>API Token Expiry Warning</h3>';
    emailBody += '<p>The following OAuth credentials are set to expire within ' + warningDays + ' days:</p>';
    emailBody += '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse;">';
    emailBody += '<tr><th>Name</th><th>User</th><th>Client ID</th><th>Expires On</th></tr>';

    while (gr.next()) {
        emailBody += '<tr>';
        emailBody += '<td>' + gr.getDisplayValue('name') + '</td>';
        emailBody += '<td>' + gr.getDisplayValue('user') + '</td>';
        emailBody += '<td>' + gr.getValue('client_id') + '</td>';
        emailBody += '<td>' + gr.getDisplayValue('expires_on') + '</td>';
        emailBody += '</tr>';
    }
    emailBody += '</table>';
    emailBody += '<p>Please review and renew tokens to avoid integration failures.</p>';

    // Send the email
    var mail = new GlideEmailOutbound();
    mail.setFrom('no-reply@yourdomain.com');
    mail.setSubject('[ServiceNow] OAuth API Token Expiry Warning');
    mail.setTo(emailRecipients);
    mail.setBody(emailBody);
    mail.setContentType('text/html');
    mail.send();

    gs.info('OAuth token expiry warning email sent to: ' + emailRecipients);

})();
