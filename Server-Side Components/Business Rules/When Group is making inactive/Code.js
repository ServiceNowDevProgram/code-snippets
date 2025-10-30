(function executeRule(current, previous /*null when async*/) {

    // Run only when group is being inactivated
    if (current.active.changes() && current.active == false) {

        var openTicketCount = 0;

        // List of task tables to check
        var taskTables = ['incident', 'problem', 'change_request'];

        for (var i = 0; i < taskTables.length; i++) {
            var gr = new GlideRecord(taskTables[i]);
            gr.addQuery('assignment_group', current.sys_id);
            gr.addQuery('active', true);
            gr.query();
            if (gr.hasNext()) {
                openTicketCount++;
                break; // We found at least one open ticket, no need to continue
            }
        }

        // If open tickets exist, stop the update
        if (openTicketCount > 0) {
            gs.addErrorMessage('Cannot deactivate "' + current.name + 
                '" group, because there are open tickets assigned to it.');
            current.setAbortAction(true);
        }
    }

})(current, previous);
