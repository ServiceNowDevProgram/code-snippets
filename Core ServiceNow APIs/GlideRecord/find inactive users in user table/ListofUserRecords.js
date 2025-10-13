// This script finds users who are inactive or haven't logged in for 90+ days

var today = new GlideDateTime();
var ninetyDaysAgo = new GlideDateTime();
ninetyDaysAgo.addDaysUTC(-90);

var gr = new GlideRecord('sys_user');
gr.addQuery('active', false); // user is inactive
gr.addOrCondition('last_login_time', '<', ninetyDaysAgo); // or last login before 90 days ago
gr.query();

var oldUsers = [];
while (gr.next()) {
    oldUsers.push(gr.getValue('name'));
}

gs.info('Inactive or old users: ' + oldUsers.join(', '));
