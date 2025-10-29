var user = new GlideRecord('sys_user');
user.addQuery('active', false);
user.query();
while (user.next()) {
    var inc = new GlideRecord('incident');
    inc.addQuery('assigned_to', user.sys_id);
    inc.addQuery('state', '!=', 7); // not Closed
    inc.query();
    while (inc.next()) {
        gs.info('Inactive user with open ticket: ' + user.name + ' → ' + inc.number);
    }
}
