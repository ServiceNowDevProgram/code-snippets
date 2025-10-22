(function process(/*ResolverEnvironment*/ env) {

    var user= env.getSource();
	var CI = new GlideRecord("cmdb_ci");
	CI.addQuery("sys_id",CI);
	CI.query();
	return CI;
	

})(env);
