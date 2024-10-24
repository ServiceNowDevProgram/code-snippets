function getUsersBasedOnrole(role){
	var userGR = new GlideRecord('sys_user');
	var roleGR = new GlideRecord('sys_user_has_role');
	var itilUsers = [];
	roleGR.addQuery('role.name', role);
	roleGR.query();
	
	while (roleGR.next()) {
		userGR.get(roleGR.user);
		itilUsers.push(userGR.user_name.toString());
	}
  gs.info('Users with '+ role +' role: ' + itilUsers.join(', '));
  }
getUsersBasedOnrole('itil');
