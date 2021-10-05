var checkUserRole = Class.create();
checkUserRole.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    hasRoleID: function(roleID, userID) {
		/** Checks if a user has a given role based on sys_id received
		* Returns a boolean value of true or false depending on whether or not the user has the role
		* @roleID: must be the sys_id of the role to check
		* @userID: must be the sys_id of the user to check
		*/
    var role = this.getParameter('sysparm_roleID') || roleID;
	var user = this.getParameter('sysparm_userID') || userID;
	var rolesCheck = new GlideAggregate('sys_user_has_role');
        rolesCheck.addEncodedQuery('role=' + role + '^user.sys_id=' + user);
        rolesCheck.addAggregate('count');
        rolesCheck.query();
	var counter = 0;
        if (rolesCheck.next())
            counter = rolesCheck.getAggregate('count');
        if (counter > 0)
            return true;
        else
            return false;
    },

    hasRoleEmail: function(roleID, email) {
		/** Checks if a user has a given role based on sys_id of role and email address of user received
		* Only makes sense if user has an account in ServiceNow, otherwise it won't have a role anyway :)
		* Returns a boolean value of true or false depending on whether or not the user has the role
		* @roleID: must be the sys_id of the role to check
		* @email: must be an email address in string format
		*/
    var role = this.getParameter('sysparm_roleID') || roleID;
	var emailAddress = this.getParameter('sysparm_email') || email;
	var rolesCheck = new GlideAggregate('sys_user_has_role');
        rolesCheck.addEncodedQuery('role=' + role + '^user.email=' + emailAddress);
        rolesCheck.addAggregate('count');
        rolesCheck.query();
	 var counter = 0;
        if (rolesCheck.next())
            counter = rolesCheck.getAggregate('count');
        if (counter > 0)
            return true;
        else
            return false;
    },

    checkArray: function(roleName, array) {
		/** Checks if an array of users have a given role based on the role's name
		* Returns a comma separated list of names (can be changed) of those users who have the provided role
		* @roleName: must be name of the role to check as string
		* @array: must be an array that contains sys_ids, email addresses or a combination of both.
		*/
        var role = this.getParameter('sysparm_roleName') || roleName;
        var arr = [];
        arr = this.getParameter('sysparm_array') || array;
        //          gs.info('checkArray method in checkUserRole script include started.  Received parameters rolename: ' + role + ' and array: ' + arr);
        var users = arr.toString();
        //         gs.info('These are the users: ' + users);

        var userGR = new GlideRecord('sys_user');
        userGR.addEncodedQuery('sys_idIN' + users + '^ORemailIN' + users + '^roles=' + role);
        // 		gs.info('Encoded query: ' + userGR.getEncodedQuery());
        userGR.query();
        //         gs.info('userGR results: ' + userGR.getRowCount());
        var roleUsers = [];
        while (userGR.next()) {
            roleUsers.push(userGR.getDisplayValue('name')); // change this line if you want to return a different value than name (e.g. sys_id, email, etc.)
            //             gs.info('List of users with role updated: ' + roleUsers);
        }
        //         gs.info('Final list of users with role: ' + roleUsers);
        return roleUsers.toString();
    },

    checkArrayGetObjects: function(roleName, array) {
		/** Checks if an array of users have a given role based on the role's name and array of users received
		* Returns an array of objects with some details of the users who have the provided role. You can extend the object per your requirements, by default it returns sys_id, name and email.
		* @roleName: must be name of the role to check as string
		* @array: must be an array that contains sys_ids, email addresses or a combination of both.
		*/
        var role = this.getParameter('sysparm_roleName') || roleName;
        var arr = [];
        arr = this.getParameter('sysparm_array') || array;
//         gs.info('checkArrayGetObjects method in checkUserRole script include started.  Received parameters rolename: ' + role + ' and array: ' + arr);
        var users = arr.toString();
//         gs.info('These are the users: ' + users);

        var userGR = new GlideRecord('sys_user');
        userGR.addEncodedQuery('sys_idIN' + users + '^ORemailIN' + users + '^roles=' + role);
//         gs.info('Encoded query: ' + userGR.getEncodedQuery());
        userGR.query();
//         gs.info('userGR results: ' + userGR.getRowCount());
        var roleUsers = []; // this is the array that will be returned, and will contain objects as defined below in userObj variable
        var i = 0;
        while (userGR.next()) {
            var userObj = {};
			// feel free to add or remove elements to the object per your requirements, simply taking it from the GlideRecord object (userGR)
            userObj.sys_id = userGR.getValue('sys_id');
            userObj.name = userGR.getValue('name');
            userObj.email = userGR.getValue('email');
            roleUsers[i] = userObj;
            i += 1;
        }
        return roleUsers; // array of objects - Note: if you want to use it client side, you need to stringify the array first here, and convert it back in your client script!
    },

    type: 'checkUserRole'
});
