(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	g_scratchpad.isMemberOf = gs.getUser().isMemberOf('ServiceNow QA team'); // this will return true if the user is member of 'ServiceNow QA team' and false otherwise.

})(current, previous);
