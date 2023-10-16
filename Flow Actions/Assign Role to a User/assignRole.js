//The action will take the user and role object as input and will assign the role to the user.
//User and Role field of the flow action will be of reference type. For better understanding please refer to readme.md file.
(function execute(inputs, outputs) {

    var user = inputs.user;
    var role = inputs.role;

    var userRoleGR = new GlideRecord('sys_user_has_role');
    userRoleGR.initialize();
    userRoleGR.setValue('user', user.sys_id);
    userRoleGR.setValue('role', role.sys_id);
    userRoleGR.insert();

})(inputs, outputs);
