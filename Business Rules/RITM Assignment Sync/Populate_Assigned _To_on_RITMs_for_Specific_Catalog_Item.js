// create business rule on sc_request table 
(function executeRule(current, previous /*null when async*/ ) {

    var grRITM = new GlideRecord('sc_req_item');
    grRITM.addQuery('request', current.sys_id);
    grRITM.addQuery("cat_item.sc_catalogs", "791b6df48798d9100072960d3fbb35be"); //sys_id of catalog 
    grRITM.query();
    while (grRITM.next()) {
        grRITM.assigned_to = current.assigned_to;
        grRITM.update();
    }
})(current, previous);
