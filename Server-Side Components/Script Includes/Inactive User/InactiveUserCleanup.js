/**
 * This script include provides a utility to identify and deactivate users
 * who have not logged in for a specified number of days.
 * 
 * Usage: Call the `deactivateInactiveUsers` method with the number of days
 * as the parameter to deactivate users who have been inactive for that duration.
 */
var InactiveUserCleanup = Class.create();
InactiveUserCleanup.prototype = {
    initialize: function() {
        // Initialization code if needed
    },

    /**
     * Deactivates users who have not logged in for the specified number of days.
     * @param {number} days - The number of days of inactivity before deactivation.
     */
    deactivateInactiveUsers: function(days) {
        var cutoffDate = new GlideDateTime();
        cutoffDate.addDays(-days); // Set the cutoff date to 'days' ago

        // Query for users who have not logged in since the cutoff date
        var userGr = new GlideRecord('sys_user');
        userGr.addQuery('last_login_time', '<', cutoffDate);
        userGr.addQuery('active', 'true'); // Only consider active users
        userGr.query();

        while (userGr.next()) {
            userGr.active = false; // Deactivate the user
            userGr.update();
            gs.info('Deactivated user: ' + userGr.name);
        }
    },

    type: 'InactiveUserCleanup'
};
