var user_CheckEmail = Class.create();
user_CheckEmail.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    validateEmail: function() {

        //Get new value of e-mail field
        var emailString = this.getParameter('sysparm_emailString');

        //Query user table to verify if new e-mail already exists
        var user = new GlideRecord('sys_user');
        user.addQuery('email', emailString);
        user.query();

        //If e-mail already exists, return user name and sys_id
        if (user.next()) {

            var results = {
                "sys_id": user.getValue("sys_id"),
                "name": user.getValue("name")
            };
            return JSON.stringify(results);

        //If e-mail not exists, return null
        } else {
            return null;
        }
    }
});
