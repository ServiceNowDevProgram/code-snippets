    var att = new GlideRecord('sys_attachment');
    att.addNullQuery('table_sys_id');
    att.query();
    while (att.next()) {
        gs.info('Deleting Unlinked attachment: ' + att.sys_id);
        att.deleteRecord();
    }
