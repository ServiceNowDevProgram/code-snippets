//Script to lock out users who have not logged into the system longer than 30 days

//Query the users who are active, not locked out and have not logged into the system longer than 30 days
//You can add addtional conditions to protect certain groups, e.g. technical users (use grUser.addQuery())
var grUser = new GlideRecord('sys_user');
grUser.addActiveQuery();
grUser.addEncodedQuery('last_login<javascript:gs.beginningOfLast30Days()^locked_out=false');
grUser.query();

//For all users from the query, set the locked out flag to true
//You can also set different parameters, for example set active to false instead of locked out
while (grUser.next()) {
    grUser.locked_out = true;
    grUser.update();
}

//Log information about the number of locked out users
gs.info('[Scheduled Script Execution] Locked out ' + grUser.getRowCount() + ' users, which have not logged into system for longer than 30 days.');
