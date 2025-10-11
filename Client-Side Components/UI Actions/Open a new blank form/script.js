//Create New blank incident form
//Server side Script

var newFormURL = new GlideURL('incident.do');
newFormURL.addParam('sys_id', '-1');  // Open a new blank form
action.setRedirectURL(newFormURL.toString());
