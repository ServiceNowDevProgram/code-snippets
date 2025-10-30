var activeGroups = {};
var member = new GlideAggregate('sys_user_grmember');
member.addQuery('user.active', true);
member.groupBy('group');
member.query();
while (member.next()) {
    activeGroups[member.group.toString()] = true;
}

var inactiveCount = 0;
var grp = new GlideRecord('sys_user_group');
grp.addQuery('active', true); // optional filter
grp.query();
while (grp.next()) {
    if (!activeGroups[grp.sys_id.toString()]) {
        gs.info('Inactive group (no active members): ' + grp.name);
        inactiveCount++;
    }
}

gs.info('Total inactive groups found: ' + inactiveCount);
