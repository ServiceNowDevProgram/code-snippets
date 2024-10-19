// Scheduled Script Execution for Reminder
(function() {
    var changeRequests = new GlideRecord('change_request');
    changeRequests.addQuery('start_date', '=', GlideDateTime.now().getGlideObject().addDays(1)); // 1 day before
    changeRequests.query();

    while (changeRequests.next()) {
        var email = new GlideEmailOutbound();
        email.setSubject('Reminder: Upcoming Scheduled Downtime');
        email.setTo('globalplatform@universal.com'); // Replace with your distribution list
        email.setBody('Reminder:\n\n' +
                      'Scheduled downtime will occur tomorrow on ' + changeRequests.start_date + ' for maintenance.\n' +
                      'Expected duration: ' + changeRequests.duration + ' hours.\n' +
                      'Impact: ' + changeRequests.impact + '\n\n' +
                      'Please plan accordingly.\n\n' +
                      'Thank you for your understanding.');
        email.send();
    }
})();
