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
            // Add a work note to notify assignment group
            taskGR.work_notes = "Assigned user '" + current.name + "' is inactive. Please take necessary action.";
            taskGR.update();

            gs.info("Work note added to task " + taskGR.number);
    }

})(current, previous);
