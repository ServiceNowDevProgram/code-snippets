var StarterPackAjax = Class.create();
StarterPackAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getUserInfo: function() {
        var userSysid = this.getParameter("sysparm_id"); //Parameter that was passed from the Client Script
        var grUser = new GlideRecord("sys_user");
        grUser.get(userSysid);
        var result = { //build an object with the values we want to return. The "Name" of the entry should be in quotes, followed by a : and then the value, followed by a comma
            "location": grUser.getDisplayValue('location'),
            "manager": grUser.getDisplayValue('manager'),
        };
        var payload = JSON.stringify(result);
        return payload;
    },

    type: 'StarterPackAjax'
});
