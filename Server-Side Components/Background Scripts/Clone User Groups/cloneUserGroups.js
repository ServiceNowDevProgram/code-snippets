  // Replace with the sys_ids of the users
    var sourceUserSysId = 'SOURCE_USER_SYS_ID'; // Copy groups from this user
    var targetUserSysId = 'TARGET_USER_SYS_ID'; // Copy groups to this user

    // Validate both users exist
    var sourceUser = new GlideRecord('sys_user');
    if (!sourceUser.get(sourceUserSysId)) {
        gs.error('Source user not found: ' + sourceUserSysId);
        return;
    }

    var targetUser = new GlideRecord('sys_user');
    if (!targetUser.get(targetUserSysId)) {
        gs.error('Target user not found: ' + targetUserSysId);
        return;
    }

    gs.info('Cloning group memberships from ' + sourceUser.name + ' to ' + targetUser.name);

    var addedCount = 0;
    var skippedCount = 0;

    var srcGroups = new GlideRecord('sys_user_grmember');
    srcGroups.addQuery('user', sourceUserSysId);
    srcGroups.query();

    while (srcGroups.next()) {
        var groupId = srcGroups.group.toString();

        // Check if target user is already in the group
        var existing = new GlideRecord('sys_user_grmember');
        existing.addQuery('user', targetUserSysId);
        existing.addQuery('group', groupId);
        existing.query();

        if (existing.next()) {
            skippedCount++;
            gs.info('Skipped: ' + targetUser.name + ' is already a member of group ' + srcGroups.group.name);
            continue;
        }

        // Add target user to the group
        var newMember = new GlideRecord('sys_user_grmember');
        newMember.initialize();
        newMember.user = targetUserSysId;
        newMember.group = groupId;
        newMember.insert();

        gs.info('Added ' + targetUser.name + ' to group ' + srcGroups.group.name);
        addedCount++;
    }

    gs.info('Group cloning complete. ' + addedCount + ' groups added, ' + skippedCount + ' skipped.');
