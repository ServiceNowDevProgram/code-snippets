var app = new GlideRecord("sysapproval_approver");
app.addEncodedQuery('sysapproval.numberSTARTSWITHINC^state=requested'); // Please rename the "INC" with based on the number maintenance of the table that you are looking at.
app.query();
while(app.next())
 {
var createdte = new GlideDateTime(current.created_on);
var now = new GlideDateTime();
var dur = new GlideDuration();
dur = GlideDateTime.subtract(createdte,now);
var days = dur.getDayPart();
if(days%7==0) //check if it's been a week since the created date for each record.
{
 gs.eventQueue('<eventname>',approval,app.approver,app.sysapproval);
//event needs to created in the event Registry first and then the event name to be provided as the first parameter in the above eventQueue function.
// Now you configure a Notificatin that triggers based on this event and that does the Job!!!!
}
}
