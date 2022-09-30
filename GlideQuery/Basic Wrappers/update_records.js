function updateRecords( strTableName, strEncodedQuery, objValues, boolDisableWorkflow ){
	/* Given a table name, an encoded query, and an object of record values,
	 * Update all of the filtered records with the new values.
	 * Optionally, disable workflow
	 */
	 	
	if( boolDisableWorkflow === undefined || boolDisableWorkflow == 'false' ){
		boolDisableWorkflow = false;
	}

	try{

		return new global.GlideQuery.parse( strTableName, strEncodedQuery )
		.disableWorkflow( boolDisableWorkflow )
		.updateMultiple( objValues );
	
	}
	catch( e ){
	
		gs.error( 
			'An error occurred trying to update records in ' + strTableName + 
			'\nQuery: ' + strEncodedQuery + 
			'\nValues: \n' + JSON.stringify( objValues, null, 2 ) + 
			'\n\nError: ' + e.name + ': ' + e.message 
		);
		
	}
	
}