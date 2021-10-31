//Create this script include in global scope

var ImpersonateMe = Class.create();
ImpersonateMe.prototype = {

    impersonateUser: function(impersonate_to) {
        gs.info("Impersonated to " + impersonate_to);
        return session.onlineImpersonate(impersonate_to);
    },
    UnimpersonateUser: function() {
        return session.onlineUnimpersonate();
    },
    
   /* Use below code in background script
   
   var impersonator =   new global.Impersonator().impersonateUser('user_id');

      Add your code here

  var impersonator =   new global.Impersonator().UnimpersonateUser();
  */

    type: 'ImpersonateMe'
};
