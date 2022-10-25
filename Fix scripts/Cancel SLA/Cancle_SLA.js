/**
* @Description : Cancel SLA for the given task
* @encodedQuery : Encoded query for the filteration criteria on which the task SLA should be cancled
**/

cancelSLA();
function cancelSLA() {
	var cancledSlaTasks = [];
    var grSLA = new GlideRecord('task_sla'); // Glide record to Task SLA table
    grSLA.addEncodedQuery('<encodedQuery>');
    grSLA.query();
    while (grSLA.next()) {
        grSLA.stage = "cancelled"; // Cancle the SLA attached to the given record
        grSLA.setWorkflow(false); // Disables the running of business rules that might normally be triggered by subsequent actions
        grSLA.autoSysFields(); // Avoid updation of (Created, Updated,created by , Updated by) fields
        grSLA.update();
		cancledSlaTasks.push (grSLA.task.number);
    }
    gs.info('SLA cancelled for task : '+ closedSlaTasks.join());
}
