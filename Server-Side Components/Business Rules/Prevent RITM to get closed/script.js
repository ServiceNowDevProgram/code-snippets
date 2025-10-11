//This script is used to prevent an RITM to get closed if there is any active catalog task.
(function executeRule(current, previous /*null when async*/) {

	// Add your code here
var scTask = new GlideRecord('sc_task');
	scTask.addActiveQuery();
	scTask.addQuery('request_item',current.sys_id);
	scTask.query();
	if(scTask.next()){
		current.setAbortAction(true);
	}
})(current, previous);
