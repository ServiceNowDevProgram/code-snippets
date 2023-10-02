(function process(/*ResolverEnvironment*/ env) {

    var ci = env.getSource(); // This will return the sys id of configuration item.
	var now_gr = new GlideRecord('cmdb_ci');
	now_gr.addQuery('sys_id',ci);  // This will check, if the provided sys id exist or not.
	now_gr.query();
	return now_gr; // This will return the entire detail about configuration item.

})(env);
