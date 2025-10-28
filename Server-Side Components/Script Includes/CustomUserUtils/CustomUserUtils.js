var CustomUserUtils = Class.create();
CustomUserUtils.prototype = {
    initialize: function() {},

    /*
    	Parameters:
    		user : sys_id of user
    		role : role name
    	
    	Returns: boolean
    		- true 	: if the user have the exact role
    		- false	: if the user does not have exact role
    */

    hasRoleExactly: function(user, role) {
        var roleGr = new GlideRecord('sys_user_has_role');
        roleGr.addQuery('user', user);
        roleGr.addQuery('role.name', role);
        roleGr.addQuery('state', 'active');
        roleGr.setLimit(1);
        roleGr.query();

        if (roleGr.next()) {
            return true;
        }
        return false;
    },

    /*
    	Parameters:
    		user : sys_id of user
    		role : list of comma seperated roles
    	
    	Returns: Boolean
    		- true 	: if the user have any one of the exact role
    		- false	: if the user does not have any one of the exact role
    */
    hasAnyRoleExactly: function(user, roles) {
        var roleGr = new GlideRecord('sys_user_has_role');
        roleGr.addQuery('user', user);
        roleGr.addQuery('role.name', 'IN', roles);
        roleGr.addQuery('state', 'active');
        roleGr.setLimit(1);
        roleGr.query();

        if (roleGr.next()) {
            return true;
        }
        return false;
    },

    /*
    	Parameters:
    		user : sys_id of user
    		role : list of comma seperated roles
    	
    	Returns: Boolean
    		- true 	: if the user have all of the roles exactly
    		- false	: if the user does not have any one of the role exactly
    */
    hasAllRoles: function(user, roles) {
        var roleGr = new GlideRecord('sys_user_has_role');
        roleGr.addQuery('user', user);
        roleGr.addQuery('role.name', 'IN', roles);
        roleGr.addQuery('state', 'active');
        roleGr.query();
        var actual_roles = [];
        while (roleGr.next()) {
            actual_roles.push(roleGr.role.name + '');
        }
		var arrayUtil = new ArrayUtil();
		actual_roles = arrayUtil.unique(actual_roles);
        var query_roles = roles.split(',');
        if (query_roles.length === actual_roles.length) {
            return true;
        }
        return false;
    },

    /*
    	Parameters:
    		user : sys_id of user
    		group : group name
    	
    	Returns: Boolean
    		- true 	: if the user is member of the group
    		- false	: if the user is not member of the group
    */
    isMemberOf: function(user, group) {
        var grpGr = new GlideRecord('sys_user_grmember');
        grpGr.addQuery('user', user);
        grpGr.addQuery('group.name', group);
        grpGr.setLimit(1);
        grpGr.query();

        if (grpGr.next()) {
            return true;
        }
        return false;
    },

	/*
    	Parameters:
    		user : sys_id of user
    		groups : list of comma seperated group names
    	
    	Returns: Boolean
    		- true 	: if the user is member of any of one of the groups
    		- false	: if the user is not member of any groups specified
    */
    isMemberOfAny: function(user, groups) {
        var grpGr = new GlideRecord('sys_user_grmember');
        grpGr.addQuery('user', user);
        grpGr.addQuery('group.name', 'IN', groups);
        grpGr.setLimit(1);
        grpGr.query();

        if (grpGr.next()) {
            return true;
        }
        return false;
    },

	/*
    	Parameters:
    		user : sys_id of user
    		groups : list of comma seperated group names
    	
    	Returns: Boolean
    		- true 	: if the user is member of all the groups specified
    		- false	: if the user is not member of all the groups specified 
    */
    isMemberOfAll: function(user, groups) {
        var grpGr = new GlideRecord('sys_user_grmember');
        grpGr.addQuery('user', user);
        grpGr.addQuery('group.name', 'IN', groups);
        grpGr.query();
		var query_groups = groups.split(',');
		var actual_groups = [];
        while (grpGr.next()) {
            actual_groups.push(grpGr.group.name + '');
        }
		var arrayUtil = new ArrayUtil();
		actual_groups = arrayUtil.unique(actual_groups);

		if(query_groups.length === actual_groups.length){
			return true;
		}
        return false;
    },

    /*	
    	Returns: Array of user SysIDs
    */
   
    lineManagers: function() {
        var managers = [];
        var usrGa = new GlideAggregate("sys_user");
        usrGa.addQuery("active", "=", true);
        usrGa.addQuery("manager", "!=", "");
        usrGa.addAggregate("COUNT", "manager");
        usrGa.query();
        while (usrGa._next()) {
            managers.push(usrGa.getValue('manager'));
        }
        return managers;
    },

    type: 'CustomUserUtils'
};