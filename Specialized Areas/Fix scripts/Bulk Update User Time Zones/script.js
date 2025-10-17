// Bulk update user time zones for all users in a specific group

var GROUP_SYS_ID = 'PUT_GROUP_SYS_ID_HERE'; // Your group sys_id
var NEW_TIME_ZONE = 'Pacific/Auckland'; // e.g., 'America/Chicago', 'Europe/London'

// Get group members
var group = new GlideRecord('sys_user_group');
var grMembers = new GlideRecord('sys_user_grmember');
grMembers.addQuery('group', GROUP_SYS_ID);
grMembers.query();

var count = 0;
while (grMembers.next()) {
	var user = new GlideRecord('sys_user');
	if (user.get(grMembers.user)) {
		
		// Only update if timezone is different
		if (user.time_zone != NEW_TIME_ZONE) {
			var oldTz = user.time_zone;
			user.time_zone = NEW_TIME_ZONE;
			user.update();
			count++;
		}
	}
}

gs.info('Updated time zone for ' + count + ' users in group "' + GROUP_SYS_ID + '"');