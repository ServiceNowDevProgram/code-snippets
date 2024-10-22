// Business Rule: Auto-assign tasks based on skills
(function executeRule(current, previous /*null when async*/) {
    var requiredSkills = current.required_skills.split(',');
    var userGr = new GlideRecord('sys_user');
    userGr.addQuery('active', true);
    userGr.addQuery('skills', 'IN', requiredSkills);
    userGr.query();

    if (userGr.next()) {
        current.assigned_to = userGr.sys_id; // Assign to first user with required skills
        current.update();
        gs.info('Task assigned to user: ' + userGr.name);
    } else {
        gs.warn('No user found with required skills for task: ' + current.number);
    }
})(current, previous);
