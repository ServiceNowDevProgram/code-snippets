// Business Rule: After Update on change_request
// Condition: affected_ci field has changed
(function executeRule(current, previous /*null for insert*/) {
    // Suppose affected CI list is in a related list table change_request_ci
    var ciRel = new GlideRecord('change_request_ci');
    ciRel.addQuery('change_request', current.sys_id);
    ciRel.query();

    while (ciRel.next()) {
        var ci = ciRel.cmdb_ci.getRefRecord();
        if (ci.owner) {
            // create change_task (task table) record for owner
            var ct = new GlideRecord('change_task');
            ct.initialize();
            ct.change_request = current.sys_id;
            ct.cmdb_ci = ci.sys_id;
            ct.assigned_to = ci.owner;
            ct.short_description = 'Review Change for your CI: ' + ci.name;
            ct.insert();

            // send notification – could simply use gs.eventQueue or similar
            gs.eventQueue('change.ci.owner.notification', ct, ci.owner, current.sys_id);
        }
    }
})(current, previous);
