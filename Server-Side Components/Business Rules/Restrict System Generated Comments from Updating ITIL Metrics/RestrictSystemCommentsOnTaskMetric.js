//Table: Task Metric Reporting Table.
//When to run:Before update
//Conditions: Updated by is system

//Script
(function executeRule(current, previous /null when async/ ) {

    var caseSysid = current.u_task_number.sys_id;
    var grCase = new GlideRecord('sn_customerservice_case');
    if (grCase.get(caseSysid)) {
        var latestEntry = grCase.comments.getJournalEntry(1).toString();
        var latestWorknote = grCase.work_notes.getJournalEntry(1).toString();
        if (latestEntry.includes('System') || latestWorknote.includes('System')) {
            current.setAbortAction(true);
        }
    }
