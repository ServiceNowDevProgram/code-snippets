var users = ['user1', 'user2', 'user3', 'user4', 'user5']; // Add Users Array here users can be of any number

var groups = ['group1', 'group2', 'group3', 'group4', 'group5']; // Add Groups Array here groups can be of any number

for (var i = 0; i < groups.length; i++) {
    var groupSysId = groups[i];

    for (var j = 0; j < users.length; j++) {
        var userSysId = users[j];

        var grMember = new GlideRecord('sys_user_grmember');
        grMember.initialize();
        grMember.group = groupSysId;
        grMember.user = userSysId;
        grMember.insert();

        gs.info('Added User ' + userSysId + 'to group ' + groupSysId);
    }

}
