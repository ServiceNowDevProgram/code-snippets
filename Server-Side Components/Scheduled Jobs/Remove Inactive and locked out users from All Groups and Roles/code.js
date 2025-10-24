function removeRolesAndGroupMembership() {
    var glideRecordUserTable = new GlideRecord("sys_user");
    glideRecordUserTable.addEncodedQuery('active=false^locked_out=true');
    glideRecordUserTable.query();

    while (glideRecordUserTable.next()) {
        var glideRecordGroupMembers = new GlideRecord('sys_user_grmember');
        glideRecordGroupMembers.addQuery('user', glideRecordUserTable.sys_id);
        glideRecordGroupMembers.query();
        while (glideRecordGroupMembers.next()) {
            glideRecordGroupMembers.deleteRecord();
        }

        var glideRecordUserRoles = new GlideRecord('sys_user_has_role');
        glideRecordUserRoles.addQuery('user', glideRecordUserTable.sys_id);
        glideRecordUserRoles.query();
        while (glideRecordUserRoles.next()) {
            glideRecordUserRoles.deleteRecord();
        }
    }
}

// removeRolesAndGroupMembership();