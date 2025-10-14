(function() {

    var reassignedCount = 0;
    var userGR = new GlideRecord('sys_user');
    userGR.addQuery('active', false); // inactive users only
    userGR.query();

    while (userGR.next()) {
        var inactiveUser = userGR.getDisplayValue('name');
        var manager = userGR.manager; // reference field

        // Reassign incidents
        var taskGR = new GlideRecord('task');
        taskGR.addQuery('assigned_to', userGR.sys_id);
        taskGR.addQuery('state', '!=', 3); // not closed
        taskGR.query();

        var taskCount = 0;
        while (taskGR.next()) {
            taskCount++;

            if (manager) {
                taskGR.assigned_to = manager; // assign to manager
            } else {
                taskGR.assignment_group = 'Any_Group_Sys_ID'; // fallback
                taskGR.assigned_to = ''; // clear user field
            }

            taskGR.work_notes = "Auto reassigned because previous assignee (" + inactiveUser + ") is inactive.";
            taskGR.update();
        }

        if (taskCount > 0) {
            reassignedCount += taskCount;
            gs.info("Reassigned " + taskCount + " tasks from inactive user: " + inactiveUser);
        }
    }
    //gs.info("Total tasks reassigned: " + reassignedCount);

})();
