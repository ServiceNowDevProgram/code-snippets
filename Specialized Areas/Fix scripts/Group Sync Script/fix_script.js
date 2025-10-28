(function executeFixScript() {
    // List of group sys_ids to process
    var groupIds = [
        'a715cd759f2002002920bde8132e7018' // Add more sys_ids if needed
    ];

    var groupGR = new GlideRecord('sys_user_group');
    groupGR.addQuery('sys_id', 'IN', groupIds);
    groupGR.query();

    while (groupGR.next()) {
        gs.info('Processing Group: ' + groupGR.name);

        // --- Fetch all roles assigned to this group ---
        var groupRoles = [];
        var groupRoleGR = new GlideRecord('sys_group_has_role');
        groupRoleGR.addQuery('group', groupGR.sys_id);
        groupRoleGR.query();

        while (groupRoleGR.next()) {
            groupRoles.push(groupRoleGR.role.toString());
        }

        gs.info('  Group Roles: ' + groupRoles.join(', '));

        // --- Get all users in the group ---
        var usersInGroup = [];
        var memberGR = new GlideRecord('sys_user_grmember');
        memberGR.addQuery('group', groupGR.sys_id);
        memberGR.query();

        while (memberGR.next()) {
            var userGR = memberGR.user.getRefRecord();
            if (userGR.isValidRecord()) {
                usersInGroup.push({
                    userRecord: userGR,
                    memberSysId: memberGR.sys_id
                });
            }
        }

        // --- Validate each user's roles against group roles ---
        for (var i = 0; i < usersInGroup.length; i++) {
            var member = usersInGroup[i];
            var userGR = member.userRecord;

            // Collect all roles assigned to user
            var userRoles = [];
            var userRoleGR = new GlideRecord('sys_user_has_role');
            userRoleGR.addQuery('user', userGR.sys_id);
            userRoleGR.query();

            while (userRoleGR.next()) {
                userRoles.push(userRoleGR.role.toString());
            }

            // Identify missing roles
            var missingRoles = groupRoles.filter(function(role) {
                return userRoles.indexOf(role) === -1;
            });

            if (missingRoles.length > 0) {
                gs.info('  User ' + userGR.name + ' missing roles: ' + missingRoles.join(', '));
                gs.info('  Re-adding user to group to refresh roles.');

                // Remove user from the group
                var deleteGR = new GlideRecord('sys_user_grmember');
                if (deleteGR.get(member.memberSysId)) {
                    deleteGR.deleteRecord();
                }

                // Re-add user to group to trigger role re-evaluation
                var newMember = new GlideRecord('sys_user_grmember');
                newMember.initialize();
                newMember.group = groupGR.sys_id;
                newMember.user = userGR.sys_id;
                newMember.insert();

                gs.info('  User ' + userGR.name + ' re-added successfully.');
            } else {
                gs.info('  User ' + userGR.name + ' has all required roles.');
            }
        }

        gs.info('Completed processing group: ' + groupGR.name);
    }

    gs.info('Fix Script completed successfully for all specified groups.');
})();
