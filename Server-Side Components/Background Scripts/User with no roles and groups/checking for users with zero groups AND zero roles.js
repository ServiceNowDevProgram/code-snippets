var userRecord = new GlideRecord('sys_user');
userRecord.addQuery('active', true);
userRecord.query();

var orphanedUsers = [];

while(userRecord.next()) {
    var userGroups = new GlideRecord('sys_user_grmember');
    userGroups.addQuery('user', userRecord.sys_id);
    userGroups.query();
    
    var userRoles = new GlideRecord('sys_user_has_role');
    userRoles.addQuery('user', userRecord.sys_id);
    userRoles.query();
    
    if(!userGroups.hasNext() && !userRoles.hasNext()) {
        // Using getValue() instead of direct field access
        orphanedUsers.push(userRecord.getValue('user_name'));
    }
}

gs.print('Orphaned Users: ' + orphanedUsers.join(', '));

