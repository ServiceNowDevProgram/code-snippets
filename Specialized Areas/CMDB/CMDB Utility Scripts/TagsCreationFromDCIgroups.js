(function() {


    var dynamicGroups = new GlideRecord('cmdb_ci_query_based_service');// Dynamic CI Group
    dynamicGroups.addQuery('cmdb_group', '!=', ''); 
    dynamicGroups.query();

    var groupSysIds = [];
    while(dynamicGroups.next()) {
        groupSysIds.push(dynamicGroups.cmdb_group);
    }

    
    if (groupSysIds.length > 0) {
        var cmdbGroupContainsCI = new GlideRecord('cmdb_group_contains_ci');
        cmdbGroupContainsCI.addQuery('group', 'IN', groupSysIds.join(','));
        cmdbGroupContainsCI.query();

       
        while (cmdbGroupContainsCI.next()) {
         
            var keyValue = new GlideRecord('cmdb_key_value');
            keyValue.addQuery('configuration_item', cmdbGroupContainsCI.configuration_item);
            keyValue.addQuery('key', 'Application'); 
            keyValue.query();

            if (!keyValue.next()) {
                // Only insert if not already present
                keyValue.initialize();
                keyValue.setValue('configuration_item', cmdbGroupContainsCI.configuration_item);
                keyValue.setValue('key', 'Application');
                keyValue.setValue('value', dynamicGroups.name + 'AS');
                keyValue.insert();

                // Log only for new entries created (optional)
                gs.info('Created key-value for CI: ' + cmdbGroupContainsCI.configuration_item + ' in group: ' + dynamicGroups.name + ', SysID: ' + keyValue.sys_id);
            }
        }
    }

})( );
