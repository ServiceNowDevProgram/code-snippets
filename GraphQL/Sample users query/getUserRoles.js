(function process(/*ResolverEnvironment*/ env) {
	const userid = env.getArguments().id != null ? env.getArguments().id : env.getSource().sys_id;
	let ret = [];
	new global.GlideQuery('sys_user_has_role')
		.where('user', userid)
		.select('role$DISPLAY')
		.forEach((r) => {
			ret.push(r['role$DISPLAY']);
		});
	return ret;
})(env);