/Copy work notes to parent 
/* Checks if work notes have changed in the current record.
If yes, it copies the latest journal entry to the parent’s work notes.
Sets the updated flag to true.*//
(function executeRule(current, previous) {
    if (!current.parent) return;
 
    var parent = current.parent.getRefRecord();
    if (!parent.isValidRecord()) return;

    var updated = false;
	
	
    if (current.work_notes.changes()) {
        parent.work_notes = current.work_notes.getJournalEntry(1);
        updated = true;
    }
	
    if (updated) {
        parent.update();
    }
})(current, previous);	
