var now = new GlideDateTime();

var after24Hours = new GlideDateTime();
after24Hours.addSeconds(24 * 60 * 60);

var gr = new GlideRecord('change_request');
gr.addQuery('priority', 1);
gr.addQuery('state', 'NOT IN', '3,4'); 
gr.addQuery('due_date', '>=', now);
gr.addQuery('due_date', '<=', after24Hours);
gr.query();

while (gr.next()) {
        var assignedTo = gr.assigned_to;
        if (assignedTo) {
    			var mail = new GlideEmailOutbound();
    			mail.setSubject('Reminder: ' + gr.number + ' Change Request is Due within 24 Hours');
    			mail.setBody('Hi ' + assignedTo.name + ',\n\n' +
                              'The following Change Request is due within 24 hours:\n' +
                              'Number: ' + gr.number + '\n' +
                              'Short Description: ' + gr.short_description + '\n' +
                              'Due Date: ' + gr.due_date + '\n\n' +
                              'Please take the necessary actions.');
    			mail.addRecipient(assignedTo.email);
    			mail.save();
        }
}
