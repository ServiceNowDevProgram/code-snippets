(function executeRule(current, previous /*null when async*/) {

	var workNotes = current.work_notes.getJournalEntry(1);

	var parentProblem = new GlideRecord('problem'); 
	parentProblem.get(current.getValue('problem')); //fetching current problem record from the problem record
	if(parentProblem) {
	parentProblem.work_notes = 'This worknote is updated in' + current.getValue('number') + '\n' + workNotes; //updating worknotes from problem task to parent problem
	}
	parentProblem.update();
})(current, previous);
