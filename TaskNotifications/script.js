(function executeReminder() {
    // Query for overdue tasks
    var task = new GlideRecord('task');
    task.addEncodedQuery('due_date<javascript:gs.now()^state!=3');
    task.query();

    // Send reminder notification to task owner
    while (task.next()) {
        var userSysId = task.assigned_to.sys_id;
        if (userSysId) {
            var grNotification = new GlideRecord('sysevent_email_action');
            grNotification.initialize();
            grNotification.setValue('recipients', userSysId);
            grNotification.setValue('subject', 'Reminder: Task Overdue');
            grNotification.setValue('body', 'Please review and complete your overdue tasks.');
            grNotification.insert();
        }
    }
})();
