(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.orderByDesc('number');
	inc_gr.setLimit(3);
	inc_gr.query();
	let incidents = [];
	while (inc_gr.next()){
		incidents.push(inc_gr.getValue('short_description'));
	}

	function sum(x, y, z) {
		return x + '\n' + y + '\n' + z;
	}
	
	const incidents_obj = { ...incidents}; //the array's items are "spread" out as parameters
	
	current.work_notes = sum(...incidents) + '\n' + JSON.stringify(incidents_obj);

})(current, previous);