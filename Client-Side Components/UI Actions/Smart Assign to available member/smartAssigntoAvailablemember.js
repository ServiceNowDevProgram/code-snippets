var assignedToId = '';
var minOpenTasks = 77777;
var targetGroup = current.assignment_group;

if (!targetGroup) {
    gs.addErrorMessage('Please select an Assignment Group first.');
    action.setRedirectURL(current);
}

//Finding all active members in the target group
var member = new GlideRecord('sys_user_grmember');
member.addQuery('group', targetGroup);
member.query();

while (member.next()) {
    var userId = member.user.toString();

    //CountIng the number of active tasks currently assigned to the member
    var taskCountGR = new GlideAggregate('task');
    taskCountGR.addQuery('assigned_to', userId);
    taskCountGR.addQuery('active', true);
    taskCountGR.addAggregate('COUNT');
    taskCountGR.query();

    var openTasks = 0;
    if (taskCountGR.next()) {
        openTasks = taskCountGR.getAggregate('COUNT');
    }

    //Checking if this member has fewer tasks than the current minimum
    if (openTasks < minOpenTasks) {
        minOpenTasks = openTasks;
        assignedToId = userId;
    }
}

//Assigning the current record to the chosen user
if (assignedToId) {
    current.assigned_to = assignedToId;
    current.work_notes = 'Assigned via Smart Assign to the user with the fewest active tasks (' + minOpenTasks + ' open tasks).';
    current.update();
    gs.addInfoMessage('Incident assigned to ' + current.assigned_to.getDisplayValue() + '.');
} else {
    gs.addErrorMessage('Could not find an active member in the group to assign the task.');
}

action.setRedirectURL(current);
