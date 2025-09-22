var objInputs = {
    "strTableName": "u_demo_cmdb_widget",         // Which table?
    "strEncodedQuery": "nameLIKE34",			  // Which records?
    "intBatchSize": 100,	 					  // How many records at a time?
    "intBatchDelay": 3,						      // How many seconds delay to schedule the next batch
    "strLogPrefix": 'JD: ',						  // Used to prefix log entries for grouping/identification
    "strFunction": function( tableName, query ){  // Function to be executed on each record. 
        new global.GlideQuery.parse( tableName, query )
        .deleteMultiple();		  
    }
};

new ScheduleRecursion().runMe( JSON.stringify( objInputs ) );
