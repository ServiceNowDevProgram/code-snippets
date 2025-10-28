// UI Action: Mark as Escalated
// Table: incident
// Condition: current.state != 7 // Not Closed
// Client: false

(function executeAction(current) {
    current.state = 3; // Set to Escalated (assuming 3 represents Escalated state)
    current.update(); // Update the record

    // Optionally notify the support group
    var notification = new GlideRecord('sysevent_email');
    notification.initialize();
    notification.recipients = 'support_group_email@example.com';
    notification.subject = 'Incident ' + current.number + ' has been escalated';
    notification.body = 'The incident has been marked as escalated. Please address it promptly.';
    notification.insert();

    gs.addInfoMessage('Incident ' + current.number + ' has been marked as escalated.');
})(current);
