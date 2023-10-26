updateWorkNotes();
updateResolve();
function updateWorkNotes() {
	var gr = new GlideRecord('incident');
	gr.addEncodedQuery('priority=1^state=2^category=software');
	gr.query();
	while(gr.next()) {
		gr.setValue('work_notes', 'Auto Update');
		gr.update();
	}
}
function updateResolve() {
	var gr1 = new GlideRecord('incident');
	gr1.addEncodedQuery('priority=1^state=2^category=software');
	gr1.query();
	while(gr1.next()) {
		gr1.state = 6;
		gr1.close_code = 'duplicate';
		gr1.close_notes = 'Auto update';
		gr1.setWorkflow(false);
		gr1.update();
	}
}
