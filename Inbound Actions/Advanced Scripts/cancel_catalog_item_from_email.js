var worker = email.body.exiting_worker_name;
var manager = email.body.manager_name;
var termination = email.body.termination_date;
var term_f = new GlideDateTime();
term_f.setDisplayValue(termination);
var location = email.body.exiting_worker_location;
var sso = email.body.exiting_worker_sso_number;
var userid = sso + "@latitudefs.com";

var userRec = new GlideRecord("sys_user");
userRec.addQuery("user_name", userid);
userRec.query();
if (userRec.next()) {
   var userID = userRec.getUniqueValue();
}

var mgrRec = new GlideRecord("sys_user");
mgrRec.addQuery("name", manager);
mgrRec.query();
if (mgrRec.next()) {
 var mngr = mgrRec.getUniqueValue();
}

var ritm = new GlideRecord('sc_req_item');
var eq = 'cat_item=7adc4a75dbeb989047c0f132f39619cb^active=true^request.requested_for='+ userID+'^variables.342d8e75dbeb989047c0f132f39619fa='+userID;
ritm.addEncodedQuery(eq);
ritm.query();
if (ritm.next())
{
	ritm.work_notes = "received from: " + email.origemail + "\n\n" + email.body_text;
	ritm.state = '7';
	ritm.stage = 'Completed';
	var workflow = new Workflow();
	workflow.cancel(ritm);
    ritm.update();
	
	var rec = new GlideRecord('sc_task');
	rec.addQuery('request_item', ritm.getUniqueValue());
	rec.query();
	while(rec.next()){
	rec.state = '7';
	rec.update();
	}
	
   }



