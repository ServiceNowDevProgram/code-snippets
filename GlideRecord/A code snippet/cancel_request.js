var grRecord = new GlideRecord('...');
grRecord.addEncodedQuery('number=...');
grRecord.query();
while(grRecord.next()){
	cancelRequest(grRecord);
}


function cancelRequest(grRecord) {
	if (grRecord.approval == 'requested'){
		// cancel outstanding approvals
		cancelAllApprovals(grRecord.sys_id);
	}
	//cancel active flows
	cancelAllFlowExecutions(grRecord.sys_id);
	grRecord.comments = 'cancelling request';
	grRecord.approval = 'cancelled';
	grRecord.state = 'cancelled';
	grRecord.update();
}

function cancelAllApprovals(rec_sys_id) {
	var sys_apprv = new GlideRecord("sysapproval_approver");
	sys_apprv.addQuery('sysapproval', rec_sys_id);
	sys_apprv.addQuery('state', 'requested');
	sys_apprv.query();
	while (sys_apprv.next()) {
		// Cancel the approval request
		sys_apprv.setValue('state', 'cancelled'); //cancelling approval
		sys_apprv.update();
	}
}

function cancelAllFlowExecutions(rec_sys_id) {
	// Retrieve flow context ID and cancel it
	var flow_req = new GlideRecord("sys_flow_context");
	flow_req.addQuery('source_record', rec_sys_id);
  flow_req.addQuery('state','IN','WAITING,IN_PROGRESS,QUEUED');
	flow_req.query();
	while(flow_req.next()){
		// Cancel the flow execution
		sn_fd.FlowAPI.cancel(flow_req.sys_id, 'Cancelled');
	}
}
