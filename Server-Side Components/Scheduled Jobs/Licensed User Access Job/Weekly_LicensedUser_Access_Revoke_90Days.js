(function executeWeeklyJob() {

    var DAYS_INACTIVE_THRESHOLD = 90; // number of days without login before revocation
    var licensedRoles = ['itil', 'sys_approver', 'admin', 'business_stakeholder'];

    var roleGroupMap = {
        'itil': 'ITIL Group',
        'sys_approver': 'Approver Group',
        'admin': 'Admin Group',
        'business_stakeholder': 'Business Stakeholder Group'
    };

    var thresholdDate = new GlideDateTime();
    thresholdDate.addDaysUTC(-DAYS_INACTIVE_THRESHOLD);

    // Iterate through each licensed role
    for (var i = 0; i < licensedRoles.length; i++) {
        var role = licensedRoles[i];
        var groupName = roleGroupMap[role];

        var userRoleGR = new GlideRecord('sys_user_has_role');
        userRoleGR.addQuery('role.name', role);
        userRoleGR.addQuery('user.active', true);
        userRoleGR.query();

        while (userRoleGR.next()) {
            var user = userRoleGR.user.getRefRecord();
            var lastLogin = user.last_login_time;

            // If user never logged in or inactive beyond threshold
            if (!lastLogin || lastLogin < thresholdDate) {
//                gs.info('Revoking access for user: ' + user.name + ' (' + role + ')');

                // Remove from corresponding group
                var groupGR = new GlideRecord('sys_user_grmember');
                groupGR.addQuery('user', user.sys_id);
                groupGR.addQuery('group.name', groupName);
                groupGR.query();
                while (groupGR.next()) {
                    groupGR.deleteRecord();
                }

            }
        }
    }
})();
