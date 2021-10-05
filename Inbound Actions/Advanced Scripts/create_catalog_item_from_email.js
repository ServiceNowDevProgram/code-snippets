createRequest();

function createRequest() {

   var cart = new Cart();   //calling the cart API

   var item = cart.addItem('SYS_ID');   //Add sys_id of the catag item 

// set variables
var worker = email.body.name;
var termination = email.body.date;
var term_f = new GlideDateTime();
term_f.setDisplayValue(termination);
var userid = email.body.user_id;

var userRec = new GlideRecord("sys_user");
userRec.addQuery("user_name", userid);
userRec.query();
if (userRec.next()) {
   var userID = userRec.getUniqueValue();
}

cart.setVariable(item, 'employee', userID);
cart.setVariable(item, 'employee_termination_date', term_f);

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
