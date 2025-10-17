// Variant: Update users by group name instead of sys_id

var GROUP_NAME = 'Service Desk';
var NEW_TIME_ZONE = 'America/Chicago';

var groupGR = new GlideRecord('sys_user_group');
groupGR.addQuery('name', GROUP_NAME);
groupGR.query();
if (groupGR.next()) {
    var groupId = groupGR.sys_id.toString();
    var grMember = new GlideRecord('sys_user_grmember');
    grMember.addQuery('group', groupId);
    grMember.query();
    var count = 0;
    while (grMember.next()) {
        var user = new GlideRecord('sys_user');
        if (user.get(grMember.user)) {
            user.time_zone = NEW_TIME_ZONE;
            user.update();
            count++;
        }
    }
    gs.print('Updated time zone for ' + count + ' users in group "' + GROUP_NAME + '"');
} else {
    gs.print('Group not found: ' + GROUP_NAME);
}