(function() {
    // Purpose: Count how many users hold each licensed role
    // Roles: sys_approver, itil, business_stakeholder, admin

    var roles = ['sys_approver', 'itil', 'business_stakeholder', 'admin'];

    for (var i = 0; i < roles.length; i++) {
        var roleName = roles[i];

        var ga = new GlideAggregate('sys_user_has_role');
        ga.addQuery('role.name', roleName);
        ga.addAggregate('COUNT');
        ga.query();

        if (ga.next()) {
            var count = parseInt(ga.getAggregate('COUNT'), 10);
            gs.info(roleName + ': ' + count + ' licensed users');
        } else {
            gs.info(roleName + ': no users found.');
        }
    }

})();
