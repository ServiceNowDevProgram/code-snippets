(function removeTestData() {

    var tables = ['task','sc_request', 'sc_req_item', 'sc_task', 'incident', 'incident_task', 'change_request', 'change_task', 'problem', 'problem_task', 'sysapproval_approver', 'sys_email', 'kb_knowledge','wf_context'];
	
	for (var table in tables){
		//addRecordToTable(tables[table]); //used for testing, adds a blank record to each table listed
		removeDataFromTable(table);
	}

	function removeDataFromTable(table){
		var tableGR = new GlideRecord(table);
		tableGR.setLimit(1);
		tableGR.query();
		while (tableGR.next()){
			tableGR.deleteRecord();
		}
	}
	
	function addRecordToTable(table){
		var tableGR = new GlideRecord(table);
		try{ 
		tableGR.initialize();
		tableGR.insert();
		}catch(ex){
			gs.info(ex);
		}
	}
})();
