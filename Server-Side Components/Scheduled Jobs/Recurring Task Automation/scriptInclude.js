var RecurringTaskGenerator = Class.create();
RecurringTaskGenerator.prototype = {
    initialize: function() {},

    generateTasks: function() {
        var templateGR = new GlideRecord('u_recurring_task_template');
        templateGR.addActiveQuery();
        templateGR.query();

        while (templateGR.next()) {
            var lastRun = templateGR.last_run_date || templateGR.start_date;
            var nextRun = new GlideDateTime(lastRun);
            
            // Calculate next run based on frequency
            if (templateGR.frequency == 'daily') nextRun.addDaysUTC(1);
            else if (templateGR.frequency == 'weekly') nextRun.addDaysUTC(7);
            else if (templateGR.frequency == 'monthly') nextRun.addMonthsUTC(1);

            var now = new GlideDateTime();
            if (nextRun <= now) {
                // Create new task from template
                var newTask = new GlideRecord('task');
                newTask.initialize();
                newTask.short_description = templateGR.template_task.short_description + ' (Recurring)';
                newTask.description = templateGR.template_task.description;
                newTask.assignment_group = templateGR.assignment_group;
                newTask.assigned_to = templateGR.assigned_to;
                newTask.parent = templateGR.template_task; // optional link
                newTask.insert();

                // Update last run date
                templateGR.last_run_date = now;
                templateGR.update();
            }
        }
    },

    type: 'RecurringTaskGenerator'
};
