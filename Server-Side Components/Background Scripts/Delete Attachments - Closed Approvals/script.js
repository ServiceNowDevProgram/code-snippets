deleteinactiveattachments();

//deletes from approval table
function deleteinactiveattachments() {
    var appr = new GlideRecord('sysapproval_approver');
//	appr.addQuery('sys_id','2d7f326287351ad0195eb99c8bbb35b5'); //uncomment this and replace sys_id and use this to check for 1 record
    appr.addEncodedQuery('state!=requested^ORstate=NULL');
    appr.query();
    while (appr.next()) {
        var answer = deleteparentattachment(appr.sys_id);
        deletechildattachment(appr.sys_id);
        if (answer == true || answer == 'true') {
            appr.comments = "Attachment's were removed from this record. If still needed it can be located at the corresponding ticket level.";
            appr.autoSysFields(false);
            appr.setWorkflow(false);
            appr.update();
        }
    }
}
//deletes from sys_attachment table
function deleteparentattachment(record) {
    var attach_found = false;
    var attach_primary = new GlideRecord('sys_attachment');
    attach_primary.addQuery('table_sys_id', record);
    attach_primary.query();
    while (attach_primary.next()) {
        attach_primary.deleteRecord();
        attach_found = 'true';
    }
    return attach_found;
}

//deletes from sys_attachment_doc table
function deletechildattachment(record) {
    var attach_child = new GlideRecord('sys_attachment_doc');
    attach_child.addQuery('sys_attachment.table_sys_id', record);
    attach_child.query();
    while (attach_child.next()) {
        attach_child.deleteRecord();
    }
}
