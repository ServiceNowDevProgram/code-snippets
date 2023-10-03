(function process(/*ResolverEnvironment*/ env) {

    var sysid = env.getArguments().sys_id; // This will return the sys_id of incident record.
	var now_gr = new GlideRecord('incident');
	now_gr.addQuery('sys_id',sysid); // This will check, if the sys_id exist or not.
	now_gr.query();
	return now_gr;  // This will return the whole incident record.

})(env);
