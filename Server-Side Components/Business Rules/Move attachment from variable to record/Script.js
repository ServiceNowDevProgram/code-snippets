(function executeRule(current, previous /*null when async*/) {

    // List of variable names for which the attachment has to be moved to the record level.
    var attachmentVars = ['attachment1', 'attachment2']; 
    
    for (var i = 0; i < attachmentVars.length; i++) {
        var varName = attachmentVars[i];

        // Get the attachment sys_id from variable value
        var attachmentSysId = current.variables[varName];

        if (!attachmentSysId) {
            gs.info("No attachment found in variable: " + varName);
            continue;
        }

        // Get attachment record using sys_id
        var attGR = new GlideRecord('sys_attachment');
        if (attGR.get(attachmentSysId)) {
            gs.info('Moving attachment: ' + attGR.file_name);

            // Update reference to link to the RITM
            attGR.table_name = 'sc_req_item';
            attGR.table_sys_id = current.sys_id;
            attGR.update();
        }
    }

})(current, previous);
