(function executeRule(current, previous /*null when async*/) {

    // Find attachments linked to variables (table_sys_id of RITM's variables)
    var attGR = new GlideRecord('sys_attachment');
    attGR.addQuery('table_sys_id', current.sys_id); // attachment originally linked to variable of this RITM
    attGR.addQuery('table_name', '!=', 'sc_req_item'); // exclude already moved attachments
    attGR.query();

    while (attGR.next()) {
        gs.info('Moving attachment: ' + attGR.file_name);

        // Update to associate with the RITM record
        attGR.table_name = 'sc_req_item';
        attGR.table_sys_id = current.sys_id;
        attGR.update();
    }

})(current, previous);
