(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	if(current.cmdb_ci){
		var ci = current.cmdb_ci;

		var chng = new GlideRecord('change_request');
		chng.addQuery('cmdb_ci', ci);
		chng.addQuery('state', '!=', '3');
		chng.addQuery('state', '!=', '4');
		chng.query();

		var work_notes = 'Following change requests are associated with same CI. You can attach one of them.\n';

		while(chng.next()){
			work_notes += chng.number + '\n';
		}

		current.work_notes = work_notes;
		current.update();
	}

})(current, previous);
