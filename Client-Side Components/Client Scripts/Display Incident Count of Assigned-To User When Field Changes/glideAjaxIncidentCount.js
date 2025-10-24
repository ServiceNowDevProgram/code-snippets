var IncidentAssignmentCheck = Class.create();
IncidentAssignmentCheck.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getIncidentCount: function() {
        var user = this.getParameter('sysparm_user');
        var count = 0;

        if (user) {
            var gr = new GlideAggregate('incident');
            gr.addQuery('assigned_to', user);
            gr.addQuery('state', 'NOT IN', '6,7,8');
            gr.addAggregate('COUNT');a
            gr.query();

            if (gr.next()) {
                count = gr.getAggregate('COUNT');
            }
        }
        return count;
    },

    type: 'IncidentAssignmentCheck'
});
