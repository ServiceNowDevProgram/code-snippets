var ChangeEscalationHelper = Class.create();
ChangeEscalationHelper.prototype = {
    initialize: function() {},

    checkAndEscalate: function(changeId) {
        var gr = new GlideRecord('change_request');
        if (gr.get(changeId) && gr.state == '1') { // Assuming '1' = New
            // Notify change manager
            gs.eventQueue('change.escalate', gr, gs.getUserID(), '');
            
            // Log an escalation task
            var task = new GlideRecord('task');
            task.initialize();
            task.short_description = "Escalation: Change not assessed in 48 hours";
            task.parent = gr.sys_id;
            task.assignment_group.setDisplayValue('Change Management');
            task.insert();
        }
    },

    type: 'ChangeEscalationHelper'
};
