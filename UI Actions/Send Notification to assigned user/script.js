//Server Side Script to send notification to the assigned to user

var gr_sys_email = new GlideRecord('sys_email');
gr_sys_email.initialize();
gr_sys_email.type = 'send-ready';
gr_sys_email.subject = 'UI Action Notification from Incident ' + current.number;
gr_sys_email.recipients = current.assigned_to.email;
gr_sys_email.body = 'As the incident ' + current.number + ' is assigned to you, this UI Action Notification has been sent. Please review the incident.';
gr_sys_email.insert();
