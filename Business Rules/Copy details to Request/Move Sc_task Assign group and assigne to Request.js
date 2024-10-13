(function executeRule(current, previous /*null when async*/) {
    var req = current.request.getRefRecord();

    // Check if the REQ record exists
    if (req.isValidRecord()) {
        // Check if this is the first task for the REQ
        var firstTaskForReq = new GlideRecord('sc_task');
        firstTaskForReq.addQuery('request', req.getUniqueValue());
        firstTaskForReq.orderBy('sys_created_on');
        firstTaskForReq.setLimit(1); // Limit to the first task
        firstTaskForReq.query();

        if (firstTaskForReq.next() && firstTaskForReq.getUniqueValue() == current.getUniqueValue()) {
            // Copy the Assignment Group and Assigned To fields
            req.setValue('assignment_group', current.getValue('assignment_group'));
            req.setValue('assigned_to', current.getValue('assigned_to'));

            // Update the REQ record
            req.update();
        }
    }
})(current, previous);
