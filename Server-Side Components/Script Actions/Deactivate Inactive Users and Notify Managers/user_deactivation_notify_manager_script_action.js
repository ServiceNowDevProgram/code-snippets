(function(current, event, parm1, parm2) {
    var userName = parm1;
    var managerEmail = parm2;

    var subject = 'User Deactivated: ' + userName;
    var body = 'Hello,\n\n' +
               'The user "' + userName + '" has been deactivated due to inactivity.\n\n' +
               'Regards,\nSystem Administrator';

    // Send the email using GlideEmailOutbound (manual way)
    var mail = new GlideEmailOutbound();
    mail.setSubject(subject);
    mail.setBody(body);
    mail.setTo(managerEmail);
    mail.send();
})(current, event, parm1, parm2);

