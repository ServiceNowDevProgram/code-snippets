// A different kind of for/in to add to your arsenal.

//before
(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.orderByDesc('number');
	inc_gr.setLimit(10);
	inc_gr.query();
	var incidents = [];
	while (inc_gr.next()){
		incidents.push(inc_gr.getValue('short_description'));
	}
	var work_notes = [];
	for (var inc in incidents){
		work_notes.push(incidents[inc]);
	}
	
	current.work_notes = work_notes.join('\n');
	
})(current, previous);

//after
(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.orderByDesc('number');
	inc_gr.setLimit(10);
	inc_gr.query();
	var incidents = [];
	while (inc_gr.next()){
		incidents.push(inc_gr.getValue('short_description'));
	}
	let work_notes = [];
	for (let inc of incidents){
		work_notes.push(inc); //note that no index reference is needed
	}
	
	current.work_notes = work_notes.join('\n');
	
})(current, previous);