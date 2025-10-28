/*  
Notificaiton for this proble

Table : Incident (incident)

When to Send
Send when - Event is fried
Event name - SendEamilInForm

Who will receive
Event parm 1 contains recipient - True

What it will contain
// This will hold the email script which we use to populate the subjec and the body.
Message HTML - ${mail_script:IncidentFormScript}
Email template - Unsubscribe and Preferences
Content type - HTML only

*/

// Name of the Email Script will be populated when the notification has been triggered.
${mail_script:IncidentFormScript}