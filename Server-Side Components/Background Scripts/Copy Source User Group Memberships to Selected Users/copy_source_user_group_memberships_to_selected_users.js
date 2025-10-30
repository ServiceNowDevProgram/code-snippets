// Background script in ServiceNow
// Copies all group memberships from one user to specific other users

var sourceUserSysId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // sys_id of the source user
var targetUserSysIds = [
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', // target user 1
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', // target user 2
    'cccccccccccccccccccccccccccccc'  // target user 3
];

var sourceGroups = [];

// Step 1: Fetch all groups of the source user
var grMember = new GlideRecord('sys_user_grmember');
grMember.addQuery('user', sourceUserSysId);
grMember.query();

while (grMember.next()) {
    sourceGroups.push(grMember.group.toString());
}
gs.info('Source user belongs to ' + sourceGroups.length + ' groups.');

// Step 2: For each target user, add them to each group (if not already a member)
for (var i = 0; i < targetUserSysIds.length; i++) {
    var targetUserId = targetUserSysIds[i];

    for (var j = 0; j < sourceGroups.length; j++) {
        var groupId = sourceGroups[j];

        var existing = new GlideRecord('sys_user_grmember');
        existing.addQuery('user', targetUserId);
        existing.addQuery('group', groupId);
        existing.query();

        if (!existing.next()) {
            var newMember = new GlideRecord('sys_user_grmember');
            newMember.initialize();
            newMember.user = targetUserId;
            newMember.group = groupId;
            newMember.insert();

            gs.info('Added user [' + targetUserId + '] to group [' + groupId + ']');
        } else {
            gs.info('User [' + targetUserId + '] already in group [' + groupId + ']');
        }
    }
}

gs.info('--- Group replication completed successfully ---');

