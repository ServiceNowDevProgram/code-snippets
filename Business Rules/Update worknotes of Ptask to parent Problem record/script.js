(function executeRule(current, previous /*null when async*/) {

	var workNotes = current.work_notes.getJournalEntry(1);

	var gr = new GlideRecord('problem');
	gr.addQuery('sys_id',current.problem);
	gr.query();
	if(gr.next()){
		gr.work_notes ='This worknote is updated in' + current.number + "\n" + workNotes;
	}
	gr.update();
})(current, previous);
