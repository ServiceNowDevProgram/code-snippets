(function process(/*ResolverEnvironment*/ env) {

   var user = env.getSource(); // This will return the sys_id of caller_id.
	var now_gr = new GlideRecord('sys_user');
	now_gr.addQuery('sys_id',user);  // This will check, if the sys_id exist or not.
	now_gr.query();
	return now_gr; // This will return the whole incident record.

})(env);
