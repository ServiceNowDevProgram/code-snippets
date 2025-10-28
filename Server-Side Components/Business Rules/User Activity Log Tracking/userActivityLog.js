// Script to log user actions (updates, approvals) into a custom table
(function executeRule(current, previous /*null when async*/) {
    // Check if key fields are modified (customize as needed)
    if (current.state.changes() || current.approval.changes()) {
        var logEntry = new GlideRecord('u_user_activity_log');
        logEntry.initialize();

        // Populate log details
        logEntry.u_user = gs.getUserID();
        logEntry.u_action = current.state.changes() ? "State Change" : "Approval Change";
        logEntry.u_record_id = current.sys_id;
        logEntry.u_record_table = current.getTableName();
        logEntry.u_description = "User " + gs.getUserDisplayName() + " updated " + logEntry.u_action;

        logEntry.insert();
    }
})(current, previous);
