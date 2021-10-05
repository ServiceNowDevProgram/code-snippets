var worker = email.body.exiting_worker_name;
var termination = email.body.termination_date;
var term_f = new GlideDateTime();
term_f.setDisplayValue(termination);
var location = email.body.exiting_worker_location;
var userid = email.body.user_id;

var userRec = new GlideRecord("sys_user");
userRec.addQuery("user_name", userid);
userRec.query();
if (userRec.next()) {
   var userID = userRec.getUniqueValue();
}

var ritm = new GlideRecord('sc_req_item');
var eq = 'cat_item=7adc4a75dbeb989047c0f132f39619cb^active=true^request.requested_for='+ userID+'^variables.342d8e75dbeb989047c0f132f39619fa='+userID;
ritm.addEncodedQuery(eq);
ritm.query();
if(ritm.next()){
	ritm.work_notes = "received from: " + email.origemail + "\n\n" + email.body_text;
	ritm.variables.employee_termination_date = term_f;
    ritm.description = email.body_text;  
	new Workflow().restartWorkflow(ritm);
    ritm.update();
}
