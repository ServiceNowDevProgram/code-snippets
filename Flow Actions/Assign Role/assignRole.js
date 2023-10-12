(function execute(inputs, outputs) {

    var user = inputs.user_id;
    var roleSysId = inputs.role_sys_id;

    var userGR = new GlideRecord("sys_user");
    userGR.addQuery('user_name', user);
    userGR.query();

    if (userGR.next()) {
        var userSysId = userGR.getValue('sys_id');
    }

    var userRole = new GlideRecord('sys_user_has_role');
    userRole.initialize();
    userRole.setValue('user', userSysId);
    userRole.setValue('role', roleSysId);
    userRole.insert();

})(inputs, outputs);
