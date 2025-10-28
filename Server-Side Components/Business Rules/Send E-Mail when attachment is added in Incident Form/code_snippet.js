// This script script includes when attachment is added in Incident Form, then an email notification is triggered.
// Create an event on incident table
Event Name - inc_attach_upload
Table - incident

// Create a business rule on Attachement table before insert
//Condition Table Name is incident
gs.addInfoMessage('Attachement is Added');
gs.eventQueue('inc_attach_upload',current,current.table_sys_id);

// Create a Notification when event is triggered on incident table
When to Send - Event (inc_attach_upload) is triggered
Who will Receive - Any Recipients
What it will Contain - Any Email Subject and Body can be added
