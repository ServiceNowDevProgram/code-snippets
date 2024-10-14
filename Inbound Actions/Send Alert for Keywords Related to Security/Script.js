(function executeInboundAction(current, previous) {
    var securityKeywords = ['breach', 'attack', 'malware'];
    var containsSecurityIssue = securityKeywords.some(keyword => current.body_text.toLowerCase().includes(keyword));

    if (containsSecurityIssue) {
        var alertMail = new GlideEmailOutbound();
        alertMail.setSubject('Security Alert: Potential Issue Detected');
        alertMail.setTo('security_team@example.com'); // Replace with actual team email
        alertMail.setBody('A potential security issue has been reported:\n\n' + current.body_text);
        alertMail.send();
        gs.info('Sent security alert for email: ' + current.subject);
    }
})(current, previous);
