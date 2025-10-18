if (current.assigned_to !='' && current.sys_updated_by != 'system') {
    var assigned = current.assigned_to
    var updated = current.sys_updated_by;
    var needsAtt = current.needs_attention;

    var roles = [
        'sn_customerservice.customer',
        'sn_customerservice.customer_contact' 
    ];

    // Check if updated user has any required role
    var hasRole = false;
    if (updated) {
        for (var i = 0; i < roles.length; i++) {
            var roleName = roles[i];
            var roleGr = new GlideRecord('sys_user_role');
            if (roleGr.get('name', roleName)) {
                var userRoleGr = new GlideRecord('sys_user_has_role');
                userRoleGr.addQuery('user', updated);
                userRoleGr.addQuery('role', roleGr.sys_id);
                userRoleGr.query();
                if (userRoleGr.next()) {
                    hasRole = true;
                    break;
                }
            }
        }
    }

    if (assigned != updated && hasRole) {
        current.needs_attention = true;
    } else if (assigned == updated && needsAtt == true) {
        current.needs_attention = false;
    }
}
