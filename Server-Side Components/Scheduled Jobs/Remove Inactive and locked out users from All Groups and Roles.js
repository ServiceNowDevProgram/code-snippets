// Number of days threshold
var daysThreshold = 90;
var cutoffDate = new GlideDateTime();
cutoffDate.addDaysUTC(-daysThreshold);

gs.info('🔍 Starting cleanup of inactive and locked out users since: ' + cutoffDate);

// Query users inactive, locked out, and not updated in last 90 days
var userGR = new GlideRecord('sys_user');
userGR.addQuery('active', false);
userGR.addQuery('locked_out', true);
userGR.addQuery('sys_updated_on', '<=', cutoffDate);
userGR.query();

var userCount = 0;

while (userGR.next()) {
    var userSysId = userGR.getUniqueValue();
    var userName = userGR.name;

    gs.info('🧹 Cleaning up user: ' + userName + ' (' + userSysId + ')');

    // Remove from all groups
    var groupMemberGR = new GlideRecord('sys_user_grmember');
    groupMemberGR.addQuery('user', userSysId);
    groupMemberGR.query();
    while (groupMemberGR.next()) {
        gs.info('❌ Removing user from group: ' + groupMemberGR.group.name);
        groupMemberGR.deleteRecord();
    }

    // Remove all roles
    var roleGR = new GlideRecord('sys_user_has_role');
    roleGR.addQuery('user', userSysId);
    roleGR.query();
    while (roleGR.next()) {
        gs.info('❌ Removing role: ' + roleGR.role.name);
        roleGR.deleteRecord();
    }

    userCount++;
}

gs.info('✅ Cleanup complete. Total users processed: ' + userCount);
