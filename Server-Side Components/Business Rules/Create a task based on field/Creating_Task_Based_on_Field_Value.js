(function executeRule(current, previous) {
    // Check if the priority is critical and a follow-up task doesn't already exist
    if (current.priority == 1 && !current.u_follow_up_task_created) { // Assuming 1 is critical priority, and u_follow_up_task_created is a custom boolean field
        var grTask = new GlideRecord('sc_task');
        grTask.initialize();
        grTask.short_description = "Follow-up for Critical Incident: " + current.number;
        grTask.parent = current.sys_id;
        grTask.insert();
        current.u_follow_up_task_created = true; // Mark that a task has been created
        current.update(); // Update the incident to reflect the task creation
    }
})(current, previous);