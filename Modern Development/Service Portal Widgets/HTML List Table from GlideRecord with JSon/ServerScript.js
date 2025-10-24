(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */


	var table = 'incident';
	var filter = 'active=true';

  /* Code to get Table and filter values from Options 
	var table = $sp.getValue('table');
	var filter = $sp.getValue('filter'); */

  /*Get Records using Glide Record and push the data using JSon */
	data.inc = [];
	var grInc = new GlideRecord(table);
	grInc.addEncodedQuery(filter);
	grInc.query();
	while(grInc.next()){
		var json = {};
		json.number = grInc.getValue('number');
		json.short_desc = grInc.getValue('short_description');
		json.assign_gr = grInc.getDisplayValue('assignment_group');
		json.state = grInc.getDisplayValue('state');
		json.sys_id = grInc.getValue('sys_id');
		data.inc.push(json);
	}

})();
