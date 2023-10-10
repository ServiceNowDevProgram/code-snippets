function insertRecords( strTableName, arrValues, boolDisableWorkflow ){
	/* Given a table name, array of objects, where
	 * each object contains the data for a new record,
	 * Insert the new objects into the table as new records.
	 * Optionally, disable workflow
	 */
	 	
	if( boolDisableWorkflow === undefined || boolDisableWorkflow == 'false' ){
		boolDisableWorkflow = false;
	}

	try{
		var gqRecords = new global.GlideQuery( strTableName )
		.disableWorkflow( boolDisableWorkflow )

		arrValues.forEach( function( record ){
			gqRecords.insert( record );
		} );
		
	}
	catch( e ){
	
		gs.error( 
			'An error occurred trying to insert records into ' + strTableName + 
			'\nValues: \n' + JSON.stringify( arrValues, null, 2 ) + 
			'\n\nError: ' + e.name + ': ' + e.message 
		);
		
	}
	
}