(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	if (!current.assignment_group || current.assigned_to)
        return;

    var userWorkload = {};
    var grp = current.assignment_group;
    var grMember = new GlideRecord('sys_user_grmember');
    grMember.addQuery('group', grp);
    grMember.query();
    while (grMember.next()) {
        var userId = grMember.user.toString();
        var inc = new GlideAggregate('incident');
        inc.addAggregate('COUNT');
        inc.addQuery('assigned_to', userId);
        inc.addQuery('state', 'NOT IN', '6,7'); // not resolved or closed
        inc.query();

        if (inc.next()) {
            userWorkload[userId] = parseInt(inc.getAggregate('COUNT'), 10);
        } else {
            userWorkload[userId] = 0;
        }
    }

    // Find user with minimum workload
    var minUser = null;
    var minCount = Number.MAX_VALUE;
    for (var u in userWorkload) {
        if (userWorkload[u] < minCount) {
            minCount = userWorkload[u];
            minUser = u;
        }
    }

    if (minUser) {
        current.assigned_to = minUser;
        gs.info('Auto-assigned incident to user: ' + minUser);
    }

})(current, previous);
