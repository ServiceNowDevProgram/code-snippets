(function process(env) {
	const userid = env.getArguments().id != null ? env.getArguments().id : env.getSource();
	let gqUser = new global.GlideQuery('sys_user')
					.get(userid, ['sys_id', 'first_name', 'last_name'])
					.orElse({
						sys_id: '-1', 
						first_name: 'Unknown', 
						last_name: 'User'
					});
	let userObj = {
		sys_id: gqUser.sys_id,
		userName: gqUser.first_name + ' ' + gqUser.last_name
	};
	return userObj;
})(env);