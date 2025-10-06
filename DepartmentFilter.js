var getSameDeptUsers = Class.create();
getSameDeptUsers.prototype = {
    initialize: function() {},
    getSameDept: function() {
        var user = gs.getUser().getDepartmentID();
        var d = new GlideRecord('sys_user');
        d.addQuery('department', user);
        d.query();

        var str = "";
        while (d.next()) {
            str = str + "," + d.sys_id;
        }
        return 'sys_idIN' + str;

    },

    type: 'getSameDeptUsers'
};
