(function nestedWhereQueries() {
	// Both of these queries will show the equivalent results.
	// They will both query for incidents WHERE the caller is beth.anglin OR (the caller is david.miller
	// AND the state is 1).

	// 1: This example demonstrates nesting the GlideQuery directly
	var nestedQuery = new GlideQuery('incident')
		.where('caller_id.user_name', 'beth.anglin')
		.orWhere(new GlideQuery().where('caller_id.user_name', 'david.miller').where('state', 1))
		.select([
			'number',
			'caller_id.user_name',
			'state',
			'assigned_to',
			'short_description',
			'priority',
		])
		.toArray(10);

	gs.log(JSON.stringify(nestedQuery, null, 2));

	// 2: This example shows creating a query, and then nesting it in a second query
	var query = new GlideQuery('incident')
		.where('caller_id.user_name', 'david.miller')
		.where('state', 1);

	var secondQuery = new GlideQuery('incident')
		.where('caller_id.user_name', 'beth.anglin')
		.orWhere(query)
		.select([
			'number',
			'caller_id.user_name',
			'state',
			'assigned_to',
			'short_description',
			'priority',
		])
		.toArray(10);

	gs.log(JSON.stringify(secondQuery, null, 2));

	/* 
	Both Output:

		*** Script: [
	{
		"number": "INC0000601",
		"caller_id": {
		"user_name": "beth.anglin"
		},
		"state": 7,
		"assigned_to": null,
		"short_description": "The USB port on my PC stopped working",
		"priority": 5,
		"sys_id": "9e7f9864532023004247ddeeff7b121f"
	},
	{
		"number": "INC0000049",
		"caller_id": {
		"user_name": "beth.anglin"
		},
		"state": 2,
		"assigned_to": "9ee1b13dc6112271007f9d0efdb69cd0",
		"short_description": "Network storage unavailable",
		"priority": 2,
		"sys_id": "ef4225a40a0a0b5700d0b8a790747812"
	},
	{
		"number": "INC0009001",
		"caller_id": {
		"user_name": "David.Miller"
		},
		"state": 1,
		"assigned_to": null,
		"short_description": "Unable to post content on a Wiki page",
		"priority": 3,
		"sys_id": "a623cdb073a023002728660c4cf6a768"
	},
	{
		"number": "INC0009005",
		"caller_id": {
		"user_name": "David.Miller"
		},
		"state": 1,
		"assigned_to": null,
		"short_description": "Email server is down.",
		"priority": 1,
		"sys_id": "ed92e8d173d023002728660c4cf6a7bc"
	},
	{
		"number": "INC0007001",
		"caller_id": {
		"user_name": "David.Miller"
		},
		"state": 1,
		"assigned_to": null,
		"short_description": "Employee payroll application server is down.",
		"priority": 1,
		"sys_id": "f12ca184735123002728660c4cf6a7ef"
	},
	{
		"number": "INC0007002",
		"caller_id": {
		"user_name": "David.Miller"
		},
		"state": 1,
		"assigned_to": null,
		"short_description": "Need access to the common drive.",
		"priority": 4,
		"sys_id": "ff4c21c4735123002728660c4cf6a758"
	}
	]
	*/
})();
