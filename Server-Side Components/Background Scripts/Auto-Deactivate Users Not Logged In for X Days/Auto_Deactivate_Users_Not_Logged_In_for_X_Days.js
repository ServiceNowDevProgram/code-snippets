/**
 * Deactivate Dormant Users (Parameterized)
 * 
 * Deactivates users in ServiceNow who have not logged in for the specified number of days.
 * Example: deactivateDormantUsers(60);
 */

function deactivateDormantUsers(daysInactive) {
    if (!daysInactive || isNaN(daysInactive)) {
        gs.error("❌ Please provide a valid number of days. Example: deactivateDormantUsers(90);");
        return;
    }

    var cutoff = new GlideDateTime();
    cutoff.addDaysUTC(-daysInactive);

    var gr = new GlideRecord('sys_user');
    gr.addNotNullQuery("last_login_time");
    gr.addQuery('last_login_time', '<', cutoff);
    gr.addQuery('active', true);
    gr.query();

    var count = 0;
    while (gr.next()) {
        gr.active = false;
        removeUserFromGroups(gr.sys_id.toString()); //calling the function to remove the user from enrolled groups
        gr.update();
        count++;
    }

    gs.info('✅ Deactivated ' + count + ' users inactive for over ' + daysInactive + ' days (before ' + cutoff.getDisplayValue() + ').');
}
// below function is used to remove the user from the groups which the user is already a part of
function removeUserFromGroups(userSysId) {
    var gm = new GlideRecord('sys_user_grmember');
    gm.addQuery('user', userSysId);
    gm.query();

    var removedCount = 0;
    while (gm.next()) {
        var groupName = gm.group.name.toString();
        gm.deleteRecord();
        removedCount++;
        gs.info('Removed from group: ' + groupName);
    }

    if (removedCount === 0)
        gs.info('No group memberships found for user: ' + userSysId);
    else
        gs.info('Removed ' + removedCount + ' group memberships for user: ' + userSysId);
}

// Example run
// deactivateDormantUsers(90);
