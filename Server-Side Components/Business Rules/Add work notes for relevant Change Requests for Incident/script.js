(function executeRule(current, previous /*null when async*/) {

	if(current.cmdb_ci){
		var ci = current.cmdb_ci.getValue();

		var chng = new GlideRecord('change_request');
		chng.addQuery('cmdb_ci', ci);
		chng.addQuery('state', '!=', '3');
		chng.addQuery('state', '!=', '4');
		chng.query();

		var work_notes = '';

		while(chng.next()){
			work_notes += chng.getValue('number') + '\n';
		}

		if(work_notes){
			current.work_notes = 'Following change requests are associated with the same CI. You can attach one of them.\n' + work_notes;
		}
	
	}

})(current, previous);
