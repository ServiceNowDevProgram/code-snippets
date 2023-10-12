var DeleteMultipleRecordsAsync = Class.create();
DeleteMultipleRecordsAsync.prototype = {
    initialize: function() {
		
		this.secondsBetweenChunks = 1;
		
    },

	/* Delete all records asynchronously */
	deleteRecordsAsync : function(tableName, encodedQuery, executeBusinessRules, chunkSize){				
		
		this._validateVariables(tableName, encodedQuery, chunkSize);
		this._scheduleNextJob(tableName, encodedQuery, executeBusinessRules, chunkSize);
		
	},
	
	/* Delete chunk of records and schedule next chunk asynchronously */
	deleteAndScheduleNext : function(tableName, encodedQuery, executeBusinessRules, chunkSize){
		
		this._validateVariables(tableName, encodedQuery, chunkSize);
		
		var dtStart = new GlideDateTime();
		
		var rowCount = 0;
		var grRecordsToDelete = new GlideRecord(tableName);		
		
		grRecordsToDelete.addEncodedQuery(encodedQuery);
		grRecordsToDelete.setLimit(chunkSize);
		
		if(executeBusinessRules == "false"){			
			grRecordsToDelete.setWorkflow(false);			
		}
		
		grRecordsToDelete.query();
		
		while(grRecordsToDelete.next()){
			
			rowCount++;
			
			grRecordsToDelete.deleteRecord();
			
		}
				
		var dtEnd = new GlideDateTime();
		var duration = GlideDateTime.subtract(dtStart, dtEnd);
		
		var logMessage = "Deleted " + rowCount + " records in " + duration.getDisplayValue() + ".";
		
		if(rowCount == chunkSize){			
			
			this._scheduleNextJob(tableName, encodedQuery, executeBusinessRules, chunkSize);
			
			logMessage += " Next chunk scheduled to run in " + this.secondsBetweenChunks + " second(s).";
			
		}
		else{
			
			logMessage += " Job completed.";
			
		}
		
		gs.log(logMessage, "DeleteMultipleRecordsAsync");
		
	},
	
	/* create a new scheduled job for chunk delete */
	_scheduleNextJob : function(tableName, encodedQuery, executeBusinessRules, chunkSize){
		
		var scriptString = "";
		
		scriptString += "var delScript = new DeleteMultipleRecordsAsync(); \n";
		scriptString += "delScript.deleteAndScheduleNext('" + tableName + "', '" + encodedQuery + "', '" + executeBusinessRules + "', " + chunkSize + ");";
		
		var bulkStartTime = new GlideDateTime();
				
		bulkStartTime.addSeconds(this.secondsBetweenChunks);
		
		var grTrigger = new GlideRecord("sys_trigger");
		
		grTrigger.initialize();
		grTrigger.name = "DeleteMultipleRecordsAsync";
		grTrigger.next_action = bulkStartTime;
		grTrigger.script = scriptString;
		grTrigger.job_id.setDisplayValue('RunScriptJob');
		grTrigger.state = 0; /* Ready */
		grTrigger.trigger_type = 0; /* Run Once */
		
		grTrigger.insert();
		
	},
	
	_validateVariables : function(tableName, encodedQuery, chunkSize){
		
		if(tableName == undefined || tableName == ""){
			throw "Table name must be provided.";
		}
		
		if(encodedQuery == undefined || encodedQuery == ""){
			throw "Encoded query must be provided.";
		}
		
		if(chunkSize == undefined || !parseInt(chunkSize) > 0 ){
			throw "Chunk size must be a number higher than 0.";
		}
		
	},
	
    type: 'DeleteMultipleRecordsAsync'
};
