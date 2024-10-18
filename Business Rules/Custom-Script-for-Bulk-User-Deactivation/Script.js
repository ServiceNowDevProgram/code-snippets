(function() {
    // Define the time period for inactivity (e.g., 6 months)
    var inactivePeriod = GlideDateTime.addMonths(-6); // Change to desired period

    // Create a GlideRecord object to query the sys_user table
    var inactiveUsers = new GlideRecord('sys_user');
    inactiveUsers.addQuery('last_login', '<', inactivePeriod); // Filter for users not logged in for 6 months
    inactiveUsers.addQuery('active', true); // Only consider active users
    inactiveUsers.query();

    // Check if any users meet the criteria
    if (inactiveUsers.getRowCount() === 0) {
        gs.info('No users found for deactivation.');
        return; // Exit if no inactive users are found
    }

    // Loop through each inactive user and deactivate their account
    while (inactiveUsers.next()) {
        inactiveUsers.active = false; // Set active field to false
        inactiveUsers.update(); // Update the user record

        // Log the deactivation for auditing
        gs.info('Deactivated user: ' + inactiveUsers.user_name + ' (Sys ID: ' + inactiveUsers.sys_id + ')');
    }

    gs.info('Bulk user deactivation completed. Total deactivated users: ' + inactiveUsers.getRowCount());
})();
