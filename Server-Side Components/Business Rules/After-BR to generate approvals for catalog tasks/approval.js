(function executeRule(current, previous /*null when async*/) {

	// Add your code here
var sysApp = new GlideRecord('sysapproval_approver');
  sysApp.initialize();

  sysApp.state = 'requested'; //set the state to requested
  sysApp.sysapproval = current.sys_id; // set the 'Approval for' field with the current catalog task
  sysApp.source_table = 'sc_task'; // set the source table field so that document ID table can be updated properly as it is dependent on source table field.
  sysApp.approver = 'sys_id of the person for whom you want to trigger this approval'; // set the approver
  sysApp.document_id = current.sys_id; //set the sys_id to populate correct value in the Approving field.
  
  sysApp.insert(); // Insert/Create the approval record.
  
})(current, previous);
