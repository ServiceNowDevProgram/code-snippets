(function () {

	var userQuery = new GlideQuery('sys_user')
		// Find david.miller's sys_id
		.where('user_name', 'david.miller')
		.select('sys_id')
		.flatMap(function (user) {
			return new GlideQuery('incident')
				// Use david.miller's sys_id in a new query on a new table
				.where('caller_id', user.sys_id)
				.select([
					'number',
					'caller_id.user_name',
					'state',
					'assigned_to',
					'short_description',
					'priority',
				]);
		})
		.toArray(10);
})();
