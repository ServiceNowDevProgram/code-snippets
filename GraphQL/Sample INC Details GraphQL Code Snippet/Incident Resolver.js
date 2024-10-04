(function process(/*ResolverEnvironment*/ env) {

    var sys_id=env.getArguments().sys_id;
	var INC = new GlideRecord("incident");
	INC.addQuery("sys_id",sys_id);
	INC.query();
	return INC;
	

})(env);
