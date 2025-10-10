/*
 * dirty fix to make workflow execute at wanted activity after error or wrong path for example
 * run as fix script or in bg.
 */
var wfContextId = "ca1ba1bc83e83210557ff0d6feaad37d",
	wfActivityId = "b18321f083e83210557ff0d6feaad39d";

(function (wfContextId, wfActivityId) {
	//check valid context sysid 
	var contextToFix = new GlideRecord("wf_context")
	if (!contextToFix.get(wfContextId)) {
		return null;
	}
	//set context state as executing
	if (contextToFix.getValue("state") != "executing") {
		contextToFix.setValue('state', 'executing');
		contextToFix.update();
	}
	//create instance of activity [wf_activity] to execute
	var activityToContinueFromGr = new GlideRecord("wf_executing");
	activityToContinueFromGr.newRecord();
	activityToContinueFromGr.setValue("context", wfContextId);
	activityToContinueFromGr.setValue("activity", wfActivityId);
	activityToContinueFromGr.setValue("state", "executing");
	activityToContinueFromGr.insert();

	//send the update event to make the executing activity run
	new Workflow().broadcastEvent(wfContextId, 'update');
})(wfContextId, wfActivityId)
