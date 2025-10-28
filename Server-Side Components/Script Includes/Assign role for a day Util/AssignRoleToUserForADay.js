function assignRoleToUserForADay(userSysId, roleSysId) {
    try {
        var user = getUserById(userSysId);
        var role = getRoleById(roleSysId);
        var userRoleSysId = assignRoleToUser(user.sys_id, role.sys_id);
        scheduleRoleRemoval(userRoleSysId, 1); // Schedule for 1 day later
    } catch (error) {
        gs.error(error.message);
    }
}

function getUserById(userSysId) {
    var user = new GlideRecord('sys_user');
    if (!user.get(userSysId)) {
        throw new Error('User not found: ' + userSysId);
    }
    return user;
}

function getRoleById(roleSysId) {
    var role = new GlideRecord('sys_user_role');
    if (!role.get(roleSysId)) {
        throw new Error('Role not found: ' + roleSysId);
    }
    return role;
}

function assignRoleToUser(userSysId, roleSysId) {
    var userRole = new GlideRecord('sys_user_has_role');
    userRole.initialize();
    userRole.user = userSysId;
    userRole.role = roleSysId;

    var userRoleSysId = userRole.insert();
    if (!userRoleSysId) {
        throw new Error('Failed to assign role to user');
    }
    return userRoleSysId;
}

function scheduleRoleRemoval(userRoleSysId, days) {
    var job = new GlideRecord('sys_trigger');
    job.initialize();
    job.name = 'Remove user role after ' + days + ' days';
    job.script = 'var userRole = new GlideRecord("sys_user_has_role"); userRole.get("' + userRoleSysId + '"); userRole.deleteRecord();';
    job.next_action = new GlideDateTime();
    job.next_action.addDaysUTC(days);
    job.insert();
}
