(function getUserRoles() {
	// sample user
	var userName = 'bow.ruggeri';

	var roleQuery = new GlideQuery('sys_user_has_role')
		.where('user.user_name', 'bow.ruggeri')
		.select(['role$DISPLAY', 'role.active', 'user$DISPLAY', 'user.email'])
		.toArray(100);

	gs.log(JSON.stringify(roleQuery, null, 2));
})();
