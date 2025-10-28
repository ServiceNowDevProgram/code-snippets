#Business Rule
(function executeRule(current, previous /*null when async*/) {

        // Add your code here
 var userEmail=current.caller_id.email;
 g_scratchpad.callerEmail=userEmail;
})(current, previous);


#ClientScript
function onLoad() {
   //Type appropriate comment here, and begin script below

   var mail=g_scratchpad.callerEmail;
   alert("callers email address : "+mail);
   
}
