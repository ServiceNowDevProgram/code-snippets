// This script sync all related assignment groups when a record’s department changes and this business rule runs After Update
(function executeRule(current, previous) {
    if (current.department.changes()) {
        var grp = new GlideRecord('sys_user_group');
        grp.addQuery('u_department', current.department);
        grp.query();
        var list = [];
        while (grp.next()) list.push(grp.sys_id.toString());
        current.assignment_group = list.join(',');
        current.update();
    }
})(current, previous);
