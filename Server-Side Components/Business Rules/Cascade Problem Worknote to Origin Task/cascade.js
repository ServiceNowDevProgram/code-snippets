(function executeRule(current, previous /*null when async*/ ) {

   /*
   Input
   1. Worknotes changes in Problem

   Validation & Check
   Exclusion of Closed & Resolved  State Problems

   Output
   Updatation of Origin Task record worknotes

   */

    // Getting the Problem current worknotes
    var workNotes = '';
    if (current.work_notes.changes() && (current.state != 107 && current.state != 106)) {
        workNotes = current.work_notes.getJournalEntry(1).match(/\n.*/gm).join(" ");
		
        // To update in the Origin Task field directyl by using the getRefRecord() mehtod.
        var inc_rec = current.first_reported_by_task.getRefRecord();
        inc_rec.work_notes = "Update on : " + current.number + workNotes;
        inc_rec.update();
    }
   


})(current, previous);