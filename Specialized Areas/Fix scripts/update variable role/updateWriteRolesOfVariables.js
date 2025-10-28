// Fix script to update varialbes write roles 
function updateItemOptionRoles() {
    var query = 'sys_scope=5f414691db10a4101b2733f3b9961961'; // sys_id of application
    var varGr = new GlideRecord('item_option_new');
    varGr.addEncodedQuery(query);
    varGr.query();

    gs.info('Starting update for ' + varGr.getRowCount() + ' records.');

    varGr.setValue('write_roles', 'role1, role2, role3'); // 
    varGr.updateMultiple();

    gs.info('Updated ' + varGr.getRowCount() + ' records.');
}

updateItemOptionRoles();
