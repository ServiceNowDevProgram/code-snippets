(function executeRule(current, previous /*null when async*/ ) {
	
  //define the queues array
	var event_queues = ['custom_queue_1', 'custom_queue_2','custom_queue_3','custom_queue_4']

  //initialize glide record and do some filtering if necessary
	var grSomeContainer = new GlideRecord('container_table');
	grSomeContainer.addQuery('column', 'value'); //do some filtering if necessary
	grSomeContainer.query();

  //for each one of the elements log an event with 5th parameter distributing it a specific queue from the array above
	while (grSomeContainer.next()) {
		gs.eventQueue('scope.event_name', grSomeContainer,  null, null, event_queues[Math.floor(Math.random()*event_queues.length)]);
	}

})(current, previous);
