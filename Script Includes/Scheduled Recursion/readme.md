# Scheduled Recursion

To take action on a large number of records in a table, a single script may time out before the actions are completed. This is especially true for deletes. To avoid timing out the script, this solution will enable the action to be scheduled in batches with delays to avoid hanging the system for an extended operation.

## Any (i.e. Background) Script
```javascript
var objInputs = {
		"strTableName": "x_803922_demo_cmdb_widget",  // Which table?
		"strEncodedQuery": "nameLIKE34",			  // Which records?
		"intBatchSize": 100,	 					  // How many records at a time?
		"intBatchDelay": 3,						      // How many seconds delay to schedule the next batch
		"strLogPrefix": 'JD: ',						  // Used to prefix log entries
		"strFunction": "function( tableName, query ){ // Function to be executed on each record. 
			new global.GlideQuery.parse( tableName, query )
			.deleteMultiple();		  
		}"
    };

new ScheduleRecursion().runMe( JSON.stringify( objInputs ) );
```

## Script Include
```javascript
var ScheduledRecursion = Class.create();
ScheduledRecursion.prototype = {
    initialize: function( strInputs ) {},
    type: 'ScheduledRecursion',
	
	runMe: function( strInputs ){
		var objInputs = JSON.parse( strInputs );
		
		return createTrigger( strInputs );
		
	},
	
	doIt: function( strInputs ){

		try{

			objInputs = JSON.parse( strInputs );

			var totalRecordCount = new global.GlideQuery.parse( objInputs.strTableName, objInputs.strEncodedQuery ).count(); // Total records matching the query
			if( totalRecordCount == 0 ){ return null; }

			if( objInputs.intBatchCount == undefined ){
				objInputs.intBatchCount = 0;
				gs.info( objInputs.strLogPrefix + 'Starting to process ' + totalRecordCount + ' records from ' + 
						objInputs.strTableName + ' in batches of ' + objInputs.intBatchSize + ' records.\nFunction: ' + JSON.stringify( objInputs.strFunction ) );				
			}
			gs.info( objInputs.strLogPrefix + 'Batch #' + ++objInputs.intBatchCount + ', Processing ' + objInputs.intBatchSize < totalRecordCount ? objInputs.intBatchSize : totalRecordCount + 
				' of ' + totalRecordCount + ' remaining records.' );

			var batchIDs = [];
			var grBID = new GlideRecord( objInputs.strTableName );
			grBID.addEncodedQuery( objInputs.strEncodedQuery );
			grBID.setLimit( objInputs.intBatchSize );
			grBID.query();
			while( grBID.next() ){
				batchIDs.push( grBID.getUniqueValue() );
			}

			objInputs.strFunction( objInputs.strTableName, 'sys_idIN' + batchIDs )

			gs.info( objInputs.strLogPrefix + 'Batch #' + objInputs.intBatchCount + ' is complete.' );
			
			strInputs = JSON.stringify( objInputs );
			createTrigger( strInputs );
			
		}
		catch( e ){
			gs.error( 
				objInputs.strLogPrefix + 'An error occurred trying to process records from ' + objInputs.strTableName + 
				'\nERROR: ' + e.name + ': ' + e.message 
			);
		}

	},
	
	createTrigger: function( strInputs ){
		var objInputs = JSON.parse( strInputs ),
			intBatchNumber = ( objInputs.intBatchCount || 0 ) + 1,
			gdtNextAction = new GlideDateTime(),
			grTrigger = new GlideRecord( 'sys_trigger' );
		
		gdtNextAction.addSeconds( objInputs.intBatchDelay );
			
		grTrigger.initialize();
		grTrigger.setValue( 'name', 'MassRecordDeletes Batch #' + intBatchNumber);
		grTrigger.setValue( 'next_action', gdtNextAction );
		grTrigger.setValue( 'trigger_type', 0 ); // Run Once
		grTrigger.setValue( 'script', "new ScheduledRecursion().doIt( '" + strInputs + "' )" );
		
		return 'Trigger: ' + grTrigger.insert() + ': ' + gs.getProperty('glide.servlet.uri') + 'sys_trigger_list.do?nameSTARTSWITHMassRecordDeletes';
		
	},

};
```