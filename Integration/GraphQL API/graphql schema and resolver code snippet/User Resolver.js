(function process(/*ResolverEnvironment*/ env) {

   var user = env.getSource(); // This will return the sys id of caller_id record.
	var now_gr = new GlideRecord('sys_user');
	now_gr.addQuery('sys_id',user); // This will check, if the provided sys id exist or not.
	now_gr.query();
	return now_gr; // This will return the whole details about the caller.

})(env);
