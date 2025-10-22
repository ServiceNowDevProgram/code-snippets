var ResolutionProcessor = Class.create();
ResolutionProcessor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    updateRecord: function() {
        var recordId = this.getParameter('sysparm_record_id');
        var reason = this.getParameter('sysparm_reason');
        var resolution = this.getParameter('sysparm_resolution');
        gs.info("Updating record " + recordId + " with reason: " + reason + " and resolution: " + resolution);
        var grinc = new GlideRecord('incident');
        if (grinc.get(recordId)) {
            grinc.close_code = resolution;
            grinc.close_notes = reason;
            grinc.state = '6'; //set to resolved
            grinc.update();
        } else {
            gs.error('No Record found for ' + recordId);
        }
    },
    type: 'ResolutionProcessor'
});
