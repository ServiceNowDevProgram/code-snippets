var target = 'this_iser_id'; // User ID (not sys_id) of account to be deprovisioned
var admin_roles = ['admin', 'security_admin']; //Will be used if deprov_level = 2
var deprov_level = 0;
// 0 = take no action but list admin roles and active status (prints to console)
// 1 = simply make account not active and locked out 
// 2 = strip all admin roles as defined above and de-activate / lockout
// 3 = strip all roles and group memberships and de-activate / lockout
// 4 = do all of the above plus clear PW and email fields

if (this.hasRoleExactly('security_admin') && gs.getUser().getName() != target) {
    deprovisionAdminAccount(target, admin_roles, deprov_level);
} else {
    gs.info('Please ensure that you have the security_admin role prior to using this tool. Also note that you may not run this tool against your own account.');
}





function deprovisionAdminAccount() {
    try {
        var deprov_result_msg = "";
        switch (deprov_level) {
            case 0:
                deprov_result_msg = this.returnAccountProfile(target);
                break;
            case 1:
                deprov_result_msg = this.closeAccount(target);
                break;
            case 2:
                this.closeAccount(target);
                deprov_result_msg = this.stripAdminRoles(target, admin_roles);
                break;
            case 3:
                deprov_result_msg = this.closeAccount(target);
                deprov_result_msg += '\n';
                deprov_result_msg += this.stripAllRolesAndGroups(target);
                break;
            default:
                deprov_result_msg = this.returnAccountProfile(target);
                break;
        }
        gs.info(deprov_result_msg);
    } catch (error) {
        gs.error('Error in Fix Script (function deprovisionAdminAccount()): ' + error);
    }

} //deprovisionAdminAccount()

function returnAccountProfile(target) {
    //
    //Uniquely identify the user account specified in the target variable
    //
    var grTargetUser = new GlideRecordSecure('sys_user');
    grTargetUser.addQuery('user_name', target);
    grTargetUser.query();
    if (grTargetUser.getRowCount() < 0) {
        deprov_result_msg = "No account with user name " + target + " was found.";
    }
    var targetSYSID = '';
    while (grTargetUser.next()) {
        targetSYSID = grTargetUser.getUniqueValue();
    }


    var returnObj = {
        roles: [],
        groups: []
    };

    var outputMsg = '';
    var grRoleMembership = new GlideRecordSecure('sys_user_has_role');
    grRoleMembership.addQuery('user', targetSYSID);
    grRoleMembership.query();
    if (grRoleMembership.getRowCount() > 0) {
        outputMsg += 'Account ' + target + ' has been assigned the following roles: \n';
        while (grRoleMembership.next()) {
            returnObj.roles.push(grRoleMembership.getDisplayValue('role'));
            outputMsg += grRoleMembership.getDisplayValue('role') + '\n';
        }
    }

    var grGroupMembership = new GlideRecordSecure('sys_user_grmember');
    grGroupMembership.addQuery('user', targetSYSID);
    grGroupMembership.query();
    if (grGroupMembership.getRowCount() > 0) {
        outputMsg += '\nAccount ' + target + ' belongs to the following groups: \n';
        while (grGroupMembership.next()) {
            returnObj.groups.push(grGroupMembership.getDisplayValue('group'));
            outputMsg += grGroupMembership.getDisplayValue('group') + '\n';
        }
    }
    outputMsg += '\nNo changes have been made to account ' + target;
    return outputMsg;
}

function closeAccount(target) {
    var outputMsg = '';
    var grTargetUser = new GlideRecordSecure('sys_user');
    grTargetUser.addQuery('user_name', target);
    grTargetUser.query();
    if (grTargetUser.getRowCount() < 0) {
        outputMsg = "No account with user name " + target + " was found.";
    }
    while (grTargetUser.next()) {
		grTargetUser.setWorkflow(false);
        grTargetUser.setValue('active', false);
        grTargetUser.setValue('locked_out', true);
        grTargetUser.update();
    }

    outputMsg = 'Account ' + target + ' has been made not active and has been locked out.';
    return outputMsg;
}

function stripAdminRoles(target, admin_roles) {
    var outputMsg = '';
    //
    //Uniquely identify the roles specified in the admin_rolse variable
    //
    var admin_roles_SYSID = [];
    admin_roles.forEach(function(admin_role) {
        admin_roles_SYSID.push(this.getRoleID(admin_role));
    });
    //
    //Uniquely identify the user
    //
    var grTargetUser = new GlideRecordSecure('sys_user');
    grTargetUser.addQuery('user_name', target);
    grTargetUser.query();
    if (grTargetUser.getRowCount() < 0) {
        outputMsg = "No account with user name " + target + " was found.";
    }
    var targetSYSID = '';
    while (grTargetUser.next()) {
        targetSYSID = grTargetUser.getUniqueValue();
    }

    var grRoleMembershipsToStrip = new GlideRecordSecure('sys_user_has_role');
    grRoleMembershipsToStrip.addQuery('user', targetSYSID);
    grRoleMembershipsToStrip.query();
    if (admin_roles.length == 0) {
        outputMsg = 'No admin roles to strip from ' + target + '. No action on roles taken.';
        return;
    }
    var delete_count = 0;
    while (grRoleMembershipsToStrip.next()) {
        if (admin_roles_SYSID.indexOf(grRoleMembershipsToStrip.getValue('role')) > -1) {
			grRoleMembershipsToStrip.setWorkflow(false);
            grRoleMembershipsToStrip.deleteRecord();
            delete_count++;
        }
    }
    outputMsg = 'Removed ' + delete_count + ' roles from account ' + target;
    return outputMsg;
}

function stripAllRolesAndGroups(target) {
    var outputMsg = '';
    var grTargetUser = new GlideRecordSecure('sys_user');
    grTargetUser.addQuery('user_name', target);
    grTargetUser.query();
    if (grTargetUser.getRowCount() < 0) {
        outputMsg = "No account with user name " + this.target + " was found.";
    }
    var targetSYSID = '';
    while (grTargetUser.next()) {
        targetSYSID = grTargetUser.getUniqueValue();
    }

    var role_delete_count = 0;
    var group_delete_count = 0;
    var grRoleMembership = new GlideRecordSecure('sys_user_has_role');
    grRoleMembership.addQuery('user', targetSYSID);
    grRoleMembership.query();
    if (grRoleMembership.getRowCount() > 0) {
        while (grRoleMembership.next()) {
			grRoleMembership.setWorkflow(false);
            grRoleMembership.deleteRecord();
            role_delete_count++;
        }
    }

    var grGroupMembership = new GlideRecordSecure('sys_user_grmember');
    grGroupMembership.addQuery('user', targetSYSID);
    grGroupMembership.query();
    if (grGroupMembership.getRowCount() > 0) {
        while (grGroupMembership.next()) {
			grGroupMembership.setWorkflow(false);
            grGroupMembership.deleteRecord();
            group_delete_count++;
        }
    }
    outputMsg = 'Removed ' + role_delete_count + ' roles and ' +
        group_delete_count + ' groups from account ' + target;
    return outputMsg;
}

function getRoleID(roleName) {
    var returnValue = '';
    var grRole = new GlideRecord('sys_user_role');
    grRole.addQuery('name', roleName);
    grRole.query();
    while (grRole.next()) {
        returnValue = grRole.getUniqueValue();
    }
    return returnValue;
}

function hasRoleExactly(role) {
    var arrayUtility = new ArrayUtil();
    var roles = gs.getSession().getRoles() + '';
    var roleArray = roles.split(",");
    var isAuthorized = arrayUtility.contains(roleArray, role);
    return isAuthorized;
}