//Action will take the user and role as input. User and role fields are of reference type.
(function execute(inputs, outputs) {

    var user = inputs.user;
    var role = inputs.role;

    var userRoleGR = new GlideRecord('sys_user_has_role');
    userRoleGR.initialize();
    userRoleGR.setValue('user', user.sys_id);
    userRoleGR.setValue('role', role.sys_id);
    userRoleGR.insert();

})(inputs, outputs);
