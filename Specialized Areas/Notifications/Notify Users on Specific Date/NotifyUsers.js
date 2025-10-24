// Trigger Business Rule that runs on Insert/Update

(function executeRule(current, previous /*null when async*/) {

	// Add your code here

	var gDT = new GlideDateTime(current.u_email_to_be_sent_for_date); // You can select your date field when an email needs to be sent out

	gs.eventQueueScheduled('email_date', current, '', '', gDT); // Trigger an eventQueueScheduled method so that event can be triggered, the event can be created of your choice

})(current, previous);

// The event Name here is email_date, it can changed according to the needs

// Notification record will be created to generate a notification

When to Send - The event is triggered, in my case it is email_date
Who will receive - Caller of an incident, you can select your recipients
What it will contain - An Email body of your choice
