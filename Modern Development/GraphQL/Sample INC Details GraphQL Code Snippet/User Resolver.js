(function process(/*ResolverEnvironment*/ env) {

    var user= env.getSource();
	var User = new GlideRecord("sys_user");
	User.addQuery("sys_id",user);
	User.query();
	return User;
	

})(env);
