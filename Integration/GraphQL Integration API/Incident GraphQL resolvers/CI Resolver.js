(function process(/*ResolverEnvironment*/ env) {

    ci = env.getSource(); // This will return the sys_id of CI.
	var now_gr = new GlideRecord('cmdb_ci');
	now_gr.addQuery('sys_id',ci);  // This will check, if the sys_id exist or not.
	now_gr.query();
	return now_gr;  // This will return the whole CI record.

})(env);
