/**
* Description : Cancel the workflow context attached to a record
* @RecordSysId : SysId of the record for which workflow needs to be cancelled
* @RecordTable : Class of the record for which workflow need to be cancelled
* @WorkflowVersion : Workflow version
**/

var recordSysId = '<RecordSysId>'; // Change request Sys_id

var grRecord = new GlideRecord('<RecordTable>');
grRecord.get(recordSysId);

var grWorkflowContext = new GlideRecord('wf_context'); //Get the context of the workflow for given change request
grWorkflowContext.addQuery('id',grRecord.getUniqueValue());
grWorkflowContext.addQuery('workflow_version','<WorkflowVersion>'); //Query with the active workflow version
grWorkflowContext.query();
if (grWorkflowContext.next()) {

	var workflow = new workflow(); // Initiate the Workflow API
	workflow.cancelContext(grWorkflowContext); // Call function to cancel the current workflow context

}
