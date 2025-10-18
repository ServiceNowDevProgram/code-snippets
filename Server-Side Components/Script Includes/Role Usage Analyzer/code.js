
    // Role Usage Analyzer using sys_audit
    // Description: Identifies roles assigned to users that show no audit activity.

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

    // Use sys_audit to check user activity in last 90 days
    var grAudit = new GlideRecord('sys_audit');
    var ninetyDaysAgo = gs.daysAgo(90);
    grAudit.addEncodedQuery('userISNOTEMPTY^sys_created_on>=javascript:gs.daysAgo(90)');
    grAudit.query();

    while (grAudit.next()) {
        var userId = grAudit.user.toString();
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
                gs.info('[Role Usage Analyzer] Possibly Unused Role: ' + grRole.name + ' | Assigned Users: ' + roleUsageMap[roleId].users.length);
            }
        }

    }
