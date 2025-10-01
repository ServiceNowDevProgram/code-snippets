var UserUtils = Class.create();
UserUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getUserInfo: function() {
        var user = this.getParameter("sysparm_user");
        var userGr = new GlideRecord("sys_user");
        if (userGr.get(user) && userGr.getValue("vip") == true) {
            return true;
        }
        return false;
    },

    type: 'UserUtils'
});
