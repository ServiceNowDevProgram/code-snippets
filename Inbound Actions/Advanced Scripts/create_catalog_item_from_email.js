createRequest();

function createRequest() {

   var cart = new Cart();   //calling the cart API

   var item = cart.addItem('SYS_ID');   //Add sys_id of the catag item 

// set variables
var worker = email.body.exiting_worker_name;
var termination = email.body.termination_date;
var term_f = new GlideDateTime();
term_f.setDisplayValue(termination);
var userid = email.body.user_id;

var userRec = new GlideRecord("sys_user");
userRec.addQuery("user_name", userid);
userRec.query();
if (userRec.next()) {
   var userID = userRec.getUniqueValue();
}

var locRec = new GlideRecord("cmn_location");
locRec.addQuery("name", location);
locRec.query();
if (locRec.next()) {
var	loc = locRec.getUniqueValue();
}

cart.setVariable(item, 'employee', userID);
cart.setVariable(item, 'employee_termination_date', term_f);
cart.setVariable(item, 'location', loc);

var rc = cart.placeOrder();   
var ritmSys = rc.number;

updateRITM(rc.sys_id);   //call a function immediately to update the ritm.           
}

function updateRITM(req){

   var ritm = new GlideRecord('sc_req_item');
   ritm.addQuery('request', req);   
   ritm.query();
   while (ritm.next()){
       ritm.description = email.body_text;   
       ritm.update();

   }

}
event.state="stop_processing";   
