//variable values
var worker = email.body.name;
var userid = email.body.user_id;

var userRec = new GlideRecord("sys_user");
userRec.addQuery("user_name", userid);
userRec.query();
if (userRec.next()) {
   var userID = userRec.getUniqueValue();
}

//query the exisiting RITM and cancel the same.
var ritm = new GlideRecord('sc_req_item');
var eq = 'cat_item=SYS_ID_OF_THE_ITEM^active=true^request.requested_for='+ userID; //Update the sys_id of the item and update the query as you need.
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

	//query related catalog task and close the same as well.
	var rec = new GlideRecord('sc_task');
	rec.addQuery('request_item', ritm.getUniqueValue());
	rec.query();
	while(rec.next()){
	rec.state = '7';
	rec.update();
	}
	
   }



