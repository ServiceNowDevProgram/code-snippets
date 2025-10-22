(function process(/*ResolverEnvironment*/ env) {
	const userId = env.getArguments().userID;
	const groupId = env.getArguments().groupID;
	let newRec = new GlideRecord('sys_user_grmember');
	newRec.initialize();
	newRec.setValue('user', userId);
	newRec.setValue('group', groupId);
	newRec.insert();

	return {
		userName: userId,
		groupName: groupId
	};
})(env);