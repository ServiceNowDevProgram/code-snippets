//Consider the scenario of sending remainder approvals weekly. 
// Same code can be applied to any other table, where you to trigger an event or edit a record on weekly basis based on a certain Date field.

//Here is the code on the scheduled job that runs daily but sends notification after evey week(7 days) based on the due date.

var app = new GlideRecord("sysapproval_approver");
app.addActiveQuery('state','requested');
var createdte = new GlideDateTime(current.created_on);
var now = new GlideDateTime();
var dur = new GlideDuration();
dur = GlideDateTime.subtract(createdte,now);
var days = dur.getDayPart();
if(days%7==0)
{
 gs.eventQueue('<eventname',approval,app.approver,app.sysapproval);
//event needs to created in the event Registry first and then the event name to be provided as the first parameter in the above eventQueue function.
// Now you configure a Notificatin that triggers based on this event and that does the Job!!!!
}
