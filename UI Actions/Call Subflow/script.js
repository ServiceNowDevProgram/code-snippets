(function() {
	
	try {
    		// Provide subflow inputs
		var inputs = {};
		inputs['incident'] = current; //the current incident record can be provided as input to the subflow
    
    		//The subflow can either be executed synchronously (running in foreground) or asynchronously (running in background)
    		//If the flow runs asynchronously the FlowAPI will not provide the outputs of the subflow
    
    		//Asynchronous call
		// sn_fd.FlowAPI.getRunner().subflow('global.subflow_name').inBackground().withInputs(inputs).run();
    
    		//Synchronous call
		// sn_fd.FlowAPI.getRunner().subflow('global.subflow_name').inForeground().withInputs(inputs).run();
    
    		//In this case we are calling the subflow global.create_problem_from_incident synchronously and then access the subflow outputs
		var result = sn_fd.FlowAPI.getRunner().subflow('global.create_problem_from_incident').inForeground().withInputs(inputs).run();
		var outputs = result.getOutputs();

		// Get subflow outputs:
		var problem_number = outputs['problem_number'];
		var assignment_group = outputs['assignment_group'];
		
	} catch (ex) {
		var message = ex.getMessage();
		gs.error(message);
	}
	
})();
