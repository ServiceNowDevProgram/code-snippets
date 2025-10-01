// Business Rule: Auto Assign Incident
// When: Before Insert & Table: Incident
(function executeRule(current, previous /*null when async*/) {
    if (current.assigned_to.nil()) {
        var group = new GlideRecord('sys_user_group');
        group.addQuery('name', 'IT Support');
        group.query();
        if (group.next()) {
            current.assigned_to = group.getValue('manager');
        }
    }
})(current, previous);
