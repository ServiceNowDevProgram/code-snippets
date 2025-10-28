
    // Role Usage Analyzer Script
    // Description: Identifies roles assigned to users that may be unused.

    var roleUsageMap = {};
    var grUserRole = new GlideRecord('sys_user_has_role');
    grUserRole.query();

    while (grUserRole.next()) {
        var userId = grUserRole.user.toString();
        var roleId = grUserRole.role.toString();

        if (!roleUsageMap[roleId]) {
            roleUsageMap[roleId] = {
                users: [],
                used: false
            };
        }

        roleUsageMap[roleId].users.push(userId);
    }

    var grHistory = new GlideRecord('sys_history_line');
    grHistory.addQuery('user', 'ISNOTEMPTY');
    grHistory.query();

    while (grHistory.next()) {
        var userId = grHistory.user.toString();
        for (var roleId in roleUsageMap) {
            if (roleUsageMap[roleId].users.indexOf(userId) !== -1) {
                roleUsageMap[roleId].used = true;
            }
        }
    }

    for (var roleId in roleUsageMap) {
        if (!roleUsageMap[roleId].used) {
            var grRole = new GlideRecord('sys_user_role');
            if (grRole.get(roleId)) {
                gs.info('[Role Usage Analyzer] Unused Role: ' + grRole.name + ' | Assigned to Users: ' + roleUsageMap[roleId].users.length);
            }
        }
    }
