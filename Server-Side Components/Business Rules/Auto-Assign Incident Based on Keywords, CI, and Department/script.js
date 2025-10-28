//Before Insert Business Rule

(function executeRule(current, previous) {

    //  Keyword-based assignment
    var shortDesc = current.short_description.toLowerCase();
    if (shortDesc.includes("server down")) {
        current.assignment_group = 'SERVER_SUPPORT_GROUP_SYS_ID';
        return;
    } else if (shortDesc.includes("email issue")) {
        current.assignment_group = 'EMAIL_SUPPORT_GROUP_SYS_ID';
        return;
    }

    //  CI-based assignment 
    if (current.cmdb_ci) {
        var ciGR = new GlideRecord('cmdb_ci');
        if (ciGR.get(current.cmdb_ci)) {
            if (ciGR.category == 'Database') {
                current.assignment_group = 'DATABASE_SUPPORT_GROUP_SYS_ID';
                return;
            } else if (ciGR.category == 'Server') {
                current.assignment_group = 'SERVER_SUPPORT_GROUP_SYS_ID';
                return;
            }
        }
    }

    //  Department-based assignment
    if (current.caller_id) {
        var callerGR = new GlideRecord('sys_user');
        if (callerGR.get(current.caller_id)) {
            switch (callerGR.department.name) {
                case 'IT':
                    current.assignment_group = 'IT_SUPPORT_GROUP_SYS_ID';
                    break;
                case 'HR':
                    current.assignment_group = 'HR_SUPPORT_GROUP_SYS_ID';
                    break;
                default:
                    current.assignment_group = 'GENERAL_SUPPORT_GROUP_SYS_ID';
            }
        }
    }

})(current, previous);
