var userRecord = new GlideRecord('sys_user');
userRecord.addQuery('active', true);
userRecord.query();

var orphanedUsers = [];

while(userRecord.next()) {
    var userSysId = userRecord.getValue('sys_id'); 

    var userGroups = new GlideRecord('sys_user_grmember');
    userGroups.addQuery('user', userSysId); 
    userGroups.query();
    
    var userRoles = new GlideRecord('sys_user_has_role');
    userRoles.addQuery('user', userSysId); 
    userRoles.query();
    
    if(!userGroups.hasNext() && !userRoles.hasNext()) {
        orphanedUsers.push(userRecord.getValue('user_name')); 
    }
}

gs.print('Orphaned Users: ' + orphanedUsers.join(', '));
