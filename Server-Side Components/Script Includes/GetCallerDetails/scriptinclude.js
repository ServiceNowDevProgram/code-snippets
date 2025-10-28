var GetCallerDetails = Class.create(); // This will create a new class.
GetCallerDetails.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	demoTest:function(){
		var caller = this.getParameter('sysparm_caller_id');  // this will make the instance for caller id
		var user = new GlideRecord('sys_user');
		user.addQuery('sys_id',caller); // This will query the parameter, if exist
		user.query();
		if(user.next()){  // If user found
			return "Email Id: " + user.email + "\n" + "First Name " + user.first_name + "\n" + "Last Name: " + user.last_name + "\n" + "User Id: " + user.user_name;
		}
	},

    type: 'GetCallerDetails'
});
