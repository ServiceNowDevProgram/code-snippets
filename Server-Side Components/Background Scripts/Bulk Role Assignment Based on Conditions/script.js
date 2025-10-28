// Define the role to be assigned
var roleName = 'itil';

// Define the conditions for user selection
var department = 'IT';
var location = 'San Diego';

// Fetch the role record
var roleGR = new GlideRecord('sys_user_role');
roleGR.addQuery('name', roleName);
roleGR.query();
if (!roleGR.next()) {
    gs.error('Role not found: ' + roleName);
    return;
}

// Fetch users matching the conditions
var userGR = new GlideRecord('sys_user');
userGR.addQuery('department.name', department);
userGR.addQuery('location.name', location);
userGR.query();

var count = 0;
while (userGR.next()) {
    // Check if the user already has the role
    var userRoleGR = new GlideRecord('sys_user_has_role');
    userRoleGR.addQuery('user', userGR.sys_id);
    userRoleGR.addQuery('role', roleGR.sys_id);
    userRoleGR.query();
    if (!userRoleGR.next()) {
        // Assign the role to the user
        var newUserRoleGR = new GlideRecord('sys_user_has_role');
        newUserRoleGR.initialize();
        newUserRoleGR.user = userGR.sys_id;
        newUserRoleGR.role = roleGR.sys_id;
        newUserRoleGR.insert();
        count++;
    }
}

gs.info('Assigned role "' + roleName + '" to ' + count + ' users.');
