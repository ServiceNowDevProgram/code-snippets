var grp = new GlideRecord('sys_user_group');
grp.query();
while (grp.next()) {
    var member = new GlideRecord('sys_user_grmember');
    member.addQuery('group', grp.sys_id);
    member.addQuery('user.active', true);
    member.query();
    if (!member.hasNext()) {
        gs.info('Inactive group (no active members): ' + grp.name);
    }
}
