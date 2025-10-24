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
        gr.update();
        count++;
    }

    gs.info('✅ Deactivated ' + count + ' users inactive for over ' + daysInactive + ' days (before ' + cutoff.getDisplayValue() + ').');
}

// Example run
// deactivateDormantUsers(90);
