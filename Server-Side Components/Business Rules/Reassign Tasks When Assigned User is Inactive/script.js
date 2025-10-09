(function executeRule(current, previous) {

    // Trigger only when user becomes inactive
    if (previous.active && !current.active) {
        gs.info("User " + current.name + " became inactive. Reassigning their open tasks...");

        // GlideRecord to find open tasks assigned to the user
        var taskGR = new GlideRecord('task');
        taskGR.addQuery('assigned_to', current.sys_id);
        taskGR.addQuery('state', '!=', 3); // Exclude closed tasks
        taskGR.query();

        while (taskGR.next()) {
            // Reassign to user's manager if available
            if (current.manager) {
                taskGR.assigned_to = current.manager;
                gs.info("Task " + taskGR.number + " reassigned to manager " + current.manager.name);
            } else {
                // Fallback to default group
                taskGR.assignment_group = 'YOUR_DEFAULT_GROUP_SYS_ID';
                gs.info("Task " + taskGR.number + " reassigned to default group.");
            }

            taskGR.update();
        }
    }

})(current, previous);
