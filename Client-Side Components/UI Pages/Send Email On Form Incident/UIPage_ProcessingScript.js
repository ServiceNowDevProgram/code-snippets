// Getting the value from the HTML and the make the body and trigger the event for further process.

var obj={};
obj.body = body.toString();
obj.cc = cc.toString();
obj.subject = subject.toString();

// Event Trigger and passing the paramenters
/*
Parm 1 : will have the to receipient
Parm 2 : will have the cc, subject and body
*/
gs.eventQueue("SendEmailInForm",current,to,JSON.stringify(obj));