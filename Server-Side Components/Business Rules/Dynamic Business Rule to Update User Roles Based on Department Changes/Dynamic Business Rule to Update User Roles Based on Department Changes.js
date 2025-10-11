(function executeRule(current, previous /*null when async*/) {
        
        var newDepartment = current.department.getDisplayValue();

        // Clear existing roles
        var roleGR = new GlideRecord('sys_user_has_role');
        roleGR.addQuery('user', current.sys_id);
        roleGR.deleteMultiple(); // Remove existing roles

        // Assign new roles based on the new department
        var newRoleGR = new GlideRecord('sys_role');
        newRoleGR.addQuery('name', 'LIKE', newDepartment); // Assuming role names follow department names
        newRoleGR.query();

        while (newRoleGR.next()) {
            var userRoleGR = new GlideRecord('sys_user_has_role');
            userRoleGR.initialize();
            userRoleGR.user = current.sys_id;
            userRoleGR.role = newRoleGR.sys_id;
            userRoleGR.insert();
        }

        gs.info('Updated roles for user ' + current.user_name + ' based on new department: ' + newDepartment);
    }
})(current, previous);
