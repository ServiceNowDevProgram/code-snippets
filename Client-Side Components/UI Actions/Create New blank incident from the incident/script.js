//UI Action - Create New blank incident from the incident.

var newFormURL = new GlideURL('incident.do');
newFormURL.addParam('sys_id', '-1');  // Open a new blank form
action.setRedirectURL(newFormURL.toString());
