(function executeRule(current, previous /*null when async*/) {
    var req = current.request.getRefRecord();

    // Check if the REQ record exists
    if (req) {
        // Check if this is the first task for the REQ
        var firstTaskForReq = new GlideRecord('sc_task');
        firstTaskForReq.addQuery('request', req.sys_id);
        firstTaskForReq.orderBy('sys_created_on');
        firstTaskForReq.setLimit(1); // Limit to the first task
        firstTaskForReq.query();

        if (firstTaskForReq.next() && firstTaskForReq.sys_id == current.sys_id) {
            // Copy the Assignment Group and Assigned To fields
            req.assignment_group = current.assignment_group;
            req.assigned_to = current.assigned_to;
            
            // Update the REQ record
            req.update();
        }
    }
})(current, previous);
