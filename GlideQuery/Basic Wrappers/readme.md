# GlideQuery

GlideQuery is a wrapper for the GlideRecord and GlideAggregate APIs. The wrapper offers several advantages, including a single point of entry, fail-fast with friendly error messaging, native JavaScript syntax, and more. Here are some functions that implement the basic GlideQuery capabilities to help you get started.

[Product Documentation](https://docs.servicenow.com/bundle/tokyo-application-development/page/app-store/dev_portal/API_reference/GlideQuery/concept/GlideQueryGlobalAPI.html)

[ServiceNow Community Blog Entries](https://developer.servicenow.com/blog.do?p=/tags/glidequery/) 
[Streyda Article](https://www.streyda.eu/post/gliderecordorglidequery)


## Get Records
```javascript
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
```

## Insert Records
```javascript
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

```

## Update Records
```javascript
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

```

## Delete Records
```javascript
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

```