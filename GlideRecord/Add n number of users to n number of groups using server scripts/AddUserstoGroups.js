var users = ['user1', 'user2', 'user3', 'user4', 'user5']; // Add Users Array here users can be of any number, and a list of users arrays will be passed

var groups = ['group1', 'group2', 'group3', 'group4', 'group5']; // Add Groups Array here groups can be of any number, and a list of groups arrays will be passed

for (var i = 0; i < groups.length; i++) { // Visit all the groups in the list of array
    var groupSysId = groups[i];

    for (var j = 0; j < users.length; j++) { // Visit all the users in the list of array
        var userSysId = users[j];

        var grMember = new GlideRecord('sys_user_grmember'); // Query for Group Membership table
        grMember.initialize();
        grMember.group = groupSysId;
        grMember.user = userSysId;
        grMember.insert(); // Users will be inserted into the Group Membership table

        gs.info('Added User ' + userSysId + 'to group ' + groupSysId); // Info Message displaying after each users group membership creation
    }
}
