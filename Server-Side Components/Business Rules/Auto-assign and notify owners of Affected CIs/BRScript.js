// Business Rule: After Insert or After Update on change_request
// Purpose: Create Change Tasks for each affected CI and notify its owner
(function executeRule(current, previous /*null when insert*/) {

    // Query the task_ci table to get all CIs linked to this Change Request
    var ciRel = new GlideRecord('task_ci');
    ciRel.addQuery('task', current.sys_id);
    ciRel.query();

    while (ciRel.next()) {
        var ci = ciRel.ci_item.getRefRecord();  // Fetch the actual CI record

        if (ci.owner) {  // Proceed only if CI has an owner

            // Check if a Change Task for this CI and owner already exists
            var existingTask = new GlideRecord('change_task');
            existingTask.addQuery('change_request', current.sys_id);
            existingTask.addQuery('cmdb_ci', ci.sys_id);
            existingTask.addQuery('assigned_to', ci.owner);
            existingTask.query();

            if (!existingTask.next()) {
                // Create new Change Task for CI Owner
                var ct = new GlideRecord('change_task');
                ct.initialize();
                ct.change_request = current.sys_id;
                ct.cmdb_ci = ci.sys_id;
                ct.assigned_to = ci.owner;
                ct.short_description = 'Review Change for your CI: ' + ci.name;
                ct.insert();

                // Trigger a notification event
                gs.eventQueue('change.ci.owner.notification', ct, ci.owner, current.sys_id);
            }
        }
    }

})(current, previous);
