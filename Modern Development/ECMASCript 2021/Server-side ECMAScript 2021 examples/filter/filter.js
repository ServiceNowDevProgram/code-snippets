// How many times have we written long for-loops just to filter data manually? 
// The filter() method makes it so much simpler — one clean line to get exactly what you need!
// Let’s see how we used to do it vs. how clean it can be now.

//before
(function executeRule(current, previous /*null when async*/) {

	var incidents = [
		{ number: 'INC001', state: 'In Progress' },
		{ number: 'INC002', state: 'Resolved' },
		{ number: 'INC003', state: 'New' },
		{ number: 'INC004', state: 'In Progress' }
	];

	var inProgress = [];
	for (var i = 0; i < incidents.length; i++) {
		if (incidents[i].state === 'In Progress') {
			inProgress.push(incidents[i]);
		}
	}

	gs.info('In Progress Incidents: ' + JSON.stringify(inProgress));

})(current, previous);

//after
(function executeRule(current, previous /*null when async*/) {

	var incidents = [
		{ number: 'INC001', state: 'In Progress' },
		{ number: 'INC002', state: 'Resolved' },
		{ number: 'INC003', state: 'New' },
		{ number: 'INC004', state: 'In Progress' }
	];

	var inProgress = incidents.filter(inc => inc.state === 'In Progress');

	gs.info('In Progress Incidents: ' + JSON.stringify(inProgress));

})(current, previous);
