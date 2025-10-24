var ConfigurationIncidentCheck = Class.create();
ConfigurationIncidentCheck.prototype = Object.extendsObject(AbstractAjaxProcessor, {
getIncidentCount: function() {
        var ci = this.getParameter('sysparm_ci');
        if (!ci) return 0;

        var gr = new GlideAggregate('incident');
        gr.addQuery('cmdb_ci', ci);
        gr.addQuery('state', 'NOT IN', '6,7,8'); 
        gr.addAggregate('COUNT');
        gr.query();

        return gr.next() ? gr.getAggregate('COUNT') : 0;
    },

    type: 'ConfigurationIncidentCheck'
});
