//Script include to get the values of incident record fields
var IncidentDetails = Class.create();
IncidentDetails.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getIncidentDetails: function() {
        var inc = this.getParameter('sysparm_incidentSysId');
        var result = {};

        var gr = new GlideRecord('incident');
        if (gr.get(inc)) {
            result.cmdb_ci = gr.cmdb_ci.toString();
            result.priority = gr.priority.toString();
            result.assignment_group = gr.assignment_group.toString();
      			result.short_description = gr.short_description.toString();
      			result.description = gr.description.toString();
        }

        return JSON.stringify(result);
    },

    type: 'IncidentDetails'
});
