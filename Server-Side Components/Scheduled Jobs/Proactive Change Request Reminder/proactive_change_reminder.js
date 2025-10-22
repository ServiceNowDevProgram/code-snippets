//Get current time and time after 24 hours
var now = new GlideDateTime();
var after24Hours = new GlideDateTime();
after24Hours.addSeconds(24 * 60 * 60);

//Query for high-priority Change Requests due within 24 hours which are not closed or complete
var gr = new GlideRecord('change_request');
gr.addQuery('priority', 1);
gr.addQuery('state', 'NOT IN', '3,4'); 
gr.addQuery('due_date', '>=', now);
gr.addQuery('due_date', '<=', after24Hours);
gr.query();

while (gr.next()) {
    var assignedTo = gr.assigned_to.getRefRecord();
    if (assignedTo && assignedTo.email) {
        //Email reminder
        var mail = new GlideEmailOutbound();
        mail.setSubject('Proactive Reminder: ' + gr.number + ' is due within 24 hours');
        mail.setBody(
            'Hi ' + assignedTo.name + ',\n\n' +
            'This is a reminder that the following Change Request is due within the next 24 hours:\n\n' +
            'Change Request: ' + gr.number + '\n' +
            'Short Description: ' + gr.short_description + '\n' +
            'Due Date: ' + gr.due_date.getDisplayValue() + '\n\n' +
            'Please review and take the necessary actions.'
        );
        mail.addAddress('to', assignedTo.email);
        mail.send();
    }
}
