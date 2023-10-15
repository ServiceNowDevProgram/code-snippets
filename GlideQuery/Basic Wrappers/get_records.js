function getRecords( tableName, query, fields ){
	/* Given a table name, encoded query, and array of field names,
	 * Gather the request field attributes of the queried records,
	 * Build an array of JSON objects and return the array.
	 */
	 	
	return new global.GlideQuery.parse( tableName, query )
	.select( fields )
	.reduce( function( arr, rec ){
		arr.push( rec );
		return arr;
	}, [] );
	
}