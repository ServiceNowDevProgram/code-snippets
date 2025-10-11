function cloneUser(currentUserId, newUserId) {

    var newUserRecordSysId = createNewUserRecord(newUserId);
    cloneCurrentUserFields(currentUserId, newUserId);
    cloneUserRoles(currentUserId, newUserRecordSysId);
    cloneUserGroups(currentUserId, newUserRecordSysId);
}

function cloneCurrentUserFields(currentUserId, newUserId) {

    var currentUserGR = new GlideRecord("sys_user");
    currentUserGR.addQuery("user_name", currentUserId);
    currentUserGR.query();

    if (currentUserGR.next()) {
        var newUserGR = new GlideRecord("sys_user");
        newUserGR.addQuery("user_name", newUserId);
        newUserGR.query();
        if (newUserGR.next()) {
            var userGRU = new GlideRecordUtil();
            var fieldList = userGRU.getFields(currentUserGR);
            for (var index = 0; index < fieldList.length; index++) {
                var fieldName = fieldList[index];
                if (!newUserGR.getValue(fieldName)) {
                    newUserGR.setValue(fieldName, currentUserGR.getValue(fieldName));
                    newUserGR.update();
                }
            };
        }
    }
}

function createNewUserRecord(userId) {

    var userGR = new GlideRecord("sys_user");
    userGR.initialize();
    userGR.setValue("user_name", userId);
    var sysId = userGR.insert();
    return sysId;
}

function cloneUserRoles(currentUserId, newUserRecordSysId) {

    var currentUserRoleGR = new GlideRecord("sys_user_has_role");
    currentUserRoleGR.addQuery('user.user_name', currentUserId);
    currentUserRoleGR.addQuery('inherited', 'false');
    currentUserRoleGR.query();

    while (currentUserRoleGR.next()) {
        var newUserRoleGR = new GlideRecord("sys_user_has_role");
        newUserRoleGR.initialize();
        newUserRoleGR.setValue('user', newUserRecordSysId);
        newUserRoleGR.setValue('role', currentUserRoleGR.getValue('role'));
        newUserRoleGR.insert();
    }
}

function cloneUserGroups(currentUserId, newUserRecordSysId) {

    var currentUserGroupGR = new GlideRecord("sys_user_grmember");
    currentUserGroupGR.addQuery('user.user_name', currentUserId);
    currentUserGroupGR.query();

    while (currentUserGroupGR.next()) {
        var newUserGroupGR = new GlideRecord("sys_user_grmember");
        newUserGroupGR.initialize();
        newUserGroupGR.setValue('user', newUserRecordSysId);
        newUserGroupGR.setValue('group', currentUserGroupGR.getValue('group'));
        newUserGroupGR.insert();
    }
}

cloneUser('currentUserId', 'newUserId'); //currentUserId: Id of the you that we want to clone, newUserId: Id of the new user record. 
