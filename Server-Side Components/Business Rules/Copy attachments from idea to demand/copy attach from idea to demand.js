(function executeRule(current, previous /*null when async*/) {

	// Chris E; 26 Aug 2019;
	// Copy the attachments from the idea record to the demand record on creation/change
		
	try {
    
		new GlideSysAttachment().copy(current.getTableName(), current.getValue('sys_id'), current.demand.getRefRecord().getValue('sys_class_name'), current.getValue('demand'));
    
	} catch(e) {
		if(gs.isInteractive() && gs.hasRole('admin')) {
			gs.addInfoMessage('Copy attachments to demand - '+ e.message);
		}
		gs.error(e.message);
	}

})(current, previous);
