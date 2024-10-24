function getUsersBasedOnrole(role){
	var itilUsers = [];
	var userGR = new GlideRecord('sys_user');
	userGR.addEncodedQuery('roles.name=itil');
	userGR.query();
	while (userGR.next()) {
		itilUsers.push(userGR.user_name.toString());
	}
	gs.info('Users with '+ role +' role: ' + itilUsers.join(', '));
}
getUsersBasedOnrole('itil');
