(function executeRule(current, previous /*null when async*/) {

	var getTaskSLA = new GlideRecord('task_sla');
	//get the task SLA Record
	getTaskSLA.addQuery('sys_id', current.event.instance);
	getTaskSLA.query();
	while(getTaskSLA.next()){
		var incRec = new GlideRecord('incident');
		//Hardware Group sysID - 8a5055c9c61122780043563ef53438e3
		incRec.addEncodedQuery("active=true^sys_id=8a5055c9c61122780043563ef53438e3");
		incRec.addQuery('sys_id', getTaskSLA.task);
		incRec.query();
		while(incRec.next()){
			incRec.work_notes = "This ticket" + incRec.number +" has exceeded 75% of SLA.";
			incRec.update();
		}
	}
})(current, previous);
