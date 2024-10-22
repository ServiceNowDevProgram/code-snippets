// Business Rule: Trigger onboarding process on new employee creation
(function executeRule(current, previous /*null when async*/) {
    if (current.active) {
        // Create tasks for onboarding
        var onboardingTasks = ['Set up email', 'Create user account', 'Assign equipment', 'Schedule orientation'];
        
        onboardingTasks.forEach(function(task) {
            var taskGr = new GlideRecord('task');
            taskGr.initialize();
            taskGr.short_description = task;
            taskGr.assigned_to = current.manager; // Assign to the manager
            taskGr.state = 1; // Set to Open
            taskGr.insert();
        });

        // Send notification to the manager
        var email = new GlideEmailOutbound();
        email.setSubject('New Employee Onboarding: ' + current.name);
        email.setTo(current.manager.email);
        email.setBody('A new employee has been onboarded. Please check the assigned tasks.');
        email.send();
        
        gs.info('Onboarding tasks created for: ' + current.name);
    }
})(current, previous);
