(function process(env) {
	const userid = env.getArguments().id != null ? env.getArguments().id : env.getSource().sys_id;
	let ret = [];
	let grGroup = new GlideRecord('sys_user_grmember');
	grGroup.addQuery('user', userid);
	grGroup.query();
	while (grGroup.next()){
		ret.push({
			name: grGroup.getDisplayValue('group'),
			manager: grGroup.getDisplayValue('group.manager')
		});
	}
	return ret;
})(env);