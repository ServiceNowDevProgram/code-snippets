var userId = ['abel.tuter', 'abraham.lincoln']; //example
var workItems = ['INC0009009', 'INC0009005'];
/* Beginning of function*/

var gi = GlideImpersonate();
var currUser = gs.getUserID();

// If the logged in user doesn't have impersonating roles.
if (!gi.canImpersonate(currUser)) {
    gs.info("You don't have access to impersonate");
}
for (var id in userId) {
    var userGr = new GlideRecord('sys_user');
    userGr.addQuery('user_name', userId[id]);
    userGr.query();
    if (!userGr.hasNext()) {
      // If the user id mentioned is incorrect
        gs.print("Cannot find user from user id " + user[id] + ". Please Validate the user id");
    } else if (userGr.active == 'false') {
      //If the persona is inactive
        gs.print(id + " is inactve.");
    } else {
		gi.impersonate(userGr.sys_id);
      // Analysis report
        gs.print("Access result for " + gs.getUserDisplayName + ":");
		for (var item in workItems){
			var taskGr = new GlideRecord('task');
			taskGr.addQuery('number', workItems[item]);
			taskGr.query();
			gs.print(workItems[item] + " Read: " + taskGr.canRead() + ", Write: " + taskGr.canWrite());
		}

    }

}
// End impersonation. Impersonate back to logged in user
gi.impersonate(currUser); 
