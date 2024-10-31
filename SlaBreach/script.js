(function alertSLABreach() {
    // Query for tasks with SLAs nearing breach within 1 hour
    var sla = new GlideRecord('task_sla');
    sla.addEncodedQuery('breach_timeRELATIVELE@hour@1');
    sla.query();

    // Send alert notification
    while (sla.next()) {
        var taskNumber = sla.task.number;
        var assignedUser = sla.task.assigned_to;
        
        if (assignedUser) {
            gs.eventQueue("custom.sla.breach.alert", sla.task, assignedUser, taskNumber);
        }
    }
})();
