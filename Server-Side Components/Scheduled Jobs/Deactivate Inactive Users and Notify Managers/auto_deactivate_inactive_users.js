(function() {
    var inactiveDays = 90;
    var cutoffDate = new GlideDateTime();
    cutoffDate.addDaysUTC(-inactiveDays);

    var userGR = new GlideRecord('sys_user');
    userGR.addActiveQuery(); // Only active users
    userGR.addQuery('sys_created_on', '<', cutoffDate); // Old accounts

    // Using encoded query: users with last login before cutoff OR never logged in
    userGR.addEncodedQuery('last_login_time<' + cutoffDate.getValue() + '^ORlast_login_timeISEMPTY');
    userGR.query();

    while (userGR.next()) {
        var wasActive = userGR.active;
        var managerSysId = userGR.manager;

        // Deactivate the user
        userGR.active = false;
        userGR.update();

        // Notify only if manager exists and is active
        if (wasActive && managerSysId) {
            var mgrGR = new GlideRecord('sys_user');
            mgrGR.addQuery('sys_id', managerSysId);
            mgrGR.addQuery('active', true);
            mgrGR.query();

            if (mgrGR.next()) {
                gs.eventQueue(
                    'user.deactivation.notify_manager',  // Event name
                    userGR,                              // Current user record
                    userGR.name.toString(),              // parm1: user's name
                    mgrGR.email.toString()               // parm2: manager's email
                );
            }
        }
    }

    gs.info('Inactive or never-logged users deactivated; active managers notified.');
})();

