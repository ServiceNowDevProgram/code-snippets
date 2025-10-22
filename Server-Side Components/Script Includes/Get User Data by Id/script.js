var GetUserData = Class.create();
GetUserData.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	//Receive User sys_id and return User data
    GetUserBy_id: function() {
        var obj = {};
        var userID = this.getParameter('sysparm_userid');
        var myuser = new GlideRecord('sys_user');
        myuser.addQuery('sys_id', userID);
        myuser.query();

        if (myuser.next()) {
            obj.sys_id = myuser.getValue('sys_id') || '';
            obj.first_name = myuser.getValue('first_name') || '';
            obj.last_name = myuser.getValue('last_name') || '';
            obj.email = myuser.getValue('email') || '';
        }
        return JSON.stringify(obj);
    },

    type: 'GetUserData'
});
