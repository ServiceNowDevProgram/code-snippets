var CreateMajorIncident = Class.create();
CreateMajorIncident.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    majorIncCreate: function() {

        var incSysId = this.getParameter('sysparm_sysid');

        var ginc = new GlideRecord('incident');

        if (ginc.get(incSysId)) {

            ginc.major_incident_state = 'proposed';
            ginc.proposed_by = gs.getUserID();
            ginc.proposed_on = new GlideDateTime();
            ginc.work_notes = "Hello World! " + new GlideDateTime();
            ginc.update();

            return ginc.number.toString();
        }

        return 'false';
    },


    isAlreadyMajorIncident: function() {
        var incSysId = this.getParameter('sysparm_sysid');
        var ginc = new GlideRecord('incident');

        if (ginc.get(incSysId)) {
            return ginc.major_incident_state == 'proposed' ? 'true' : 'false';
        }

        return 'false';
    },

    type: 'CreateMajorIncident'
});
