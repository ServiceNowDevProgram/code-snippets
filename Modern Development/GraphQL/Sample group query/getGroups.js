(function process(env) {
	let ret = [];
	new global.GlideQuery('sys_user_group')
		.whereNotNull('manager')
		.select('name', 'manager$DISPLAY')
		.forEach((g) => {
			ret.push({
				id: g.sys_id,
				name: g.name,
				manager: g['manager$DISPLAY']
			});
		});
	return ret;
})(env);