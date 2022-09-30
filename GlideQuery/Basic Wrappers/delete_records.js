function deleteRecords( strTableName, strEncodedQuery, boolDisableWorkflow ){
	/* Given a table name and an encoded query,
	 * Delete all of the filtered records.
	 * Optionally, disable workflow
	 */
	 	
	if( boolDisableWorkflow === undefined || boolDisableWorkflow == 'false' ){
		boolDisableWorkflow = false;
	}

	try{

		return new global.GlideQuery.parse( strTableName, strEncodedQuery )
		.disableWorkflow( boolDisableWorkflow )
		.deleteMultiple();
	
	}
	catch( e ){
	
		gs.error( 
			'An error occurred trying to delete records from ' + strTableName + 
			'\nQuery: ' + strEncodedQuery + 
			'\n\nError: ' + e.name + ': ' + e.message 
		);
		
	}
	
}