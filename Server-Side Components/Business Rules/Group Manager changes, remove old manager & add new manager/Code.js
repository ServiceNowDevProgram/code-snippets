(function executeRule(current, previous /*null when async*/) {

    // Run only when the Manager field changes
    if (current.manager.changes()) {

        var groupID = current.sys_id.toString();

        // Remove old manager from group membership
        if (!gs.nil(previous.manager)) { 
            var oldMember = new GlideRecord('sys_user_grmember');
            oldMember.addQuery('group', groupID);
            oldMember.addQuery('user', previous.manager);
            oldMember.query();
            while (oldMember.next()) {
                oldMember.deleteRecord();
            }
        }

        // Add new manager to group membership
        if (!gs.nil(current.manager)) {
            var newMember = new GlideRecord('sys_user_grmember');
            newMember.initialize();
            newMember.group = groupID;
            newMember.user = current.manager;
            newMember.insert();
        }
    }

})(current, previous);
