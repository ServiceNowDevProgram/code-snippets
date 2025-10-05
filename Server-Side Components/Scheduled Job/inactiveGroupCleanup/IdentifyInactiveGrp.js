var sixMonthsAgo = new GlideDateTime();
sixMonthsAgo.addMonthsUTC(-6);

var inactiveGroups = [];

var grGroups = new GlideRecord('sys_user_group');
grGroups.addInactiveQuery(); // To find all groups that are Active = False in sys_user_group table
grGroups.addActiveQuery(); // To find all groups that are Active = True in sys_user_group table
grGroups.query();

while (grGroups.next()) {
    var groupSysId = grGroups.getValue('sys_id');
    var groupName = grGroups.getValue('name');

    // Check if the group has any task assigned in the last 6 months
    var taskCheck = new GlideAggregate('task');
    taskCheck.addQuery('assignment_group', groupSysId); //filter to only include tasks where the assignment group matches the current group's sys_id.
    taskCheck.addQuery('sys_created_on', '>', sixMonthsAgo); //filter to only include tasks that were created after the date 6 months ago.
    taskCheck.addAggregate('COUNT');
    taskCheck.query();

//If the count is greater than 0, the group has task activity, so it's not inactive.

    var isInactive = true;
    if (taskCheck.next()) {
        var count = parseInt(taskCheck.getAggregate('COUNT'), 10);
        if (count > 0) {
            isInactive = false;
        }
    }

    // Add only unique group names
    if (isInactive && inactiveGroups.indexOf(groupName) === -1) {
        inactiveGroups.push(groupName);
    }
}

// Output all inactive group names as a comma-separated string

if (inactiveGroups.length > 0) {
    var groupArrayString = '["' + inactiveGroups.join('", "') + '"]';
    gs.log('Inactive groups (last 6 months) as array: ' + groupArrayString);
} else {
    gs.log('No inactive groups found in the last 6 months.');
}
