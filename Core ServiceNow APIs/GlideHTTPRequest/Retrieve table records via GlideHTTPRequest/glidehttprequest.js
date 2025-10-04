/*
GlideHTTPRequest API is used to get the records from given table. 

Note: It prints the displayvalue of the records. as the query parameter "sysparm_display_value" is set to "true". 
*/

/********************   Please update below details *******************************/

var instance_name  /* String  */  = "myinstance.service-now.com"; 
var user_name /* String  */  = "admin"; 
var password  /* String  */  = "aAhZ0xaWkWO9"; 
var timeout   /* Integer */  = 15000; 
var table_name /* String */ = "incident";
var record_count /* Integer */ = 1;  // Numer of records to be retuned in the response
var table_fields /* String */ = "number,state"; //Provide comma separated field values

/************************************* END ****************************************/

getRecordsFromTable(user_name, password, instance_name, timeout, table_name, record_count, table_fields);

function getRecordsFromTable(user_name, password, instance_name, timeout, table_name, record_count, table_fields ){

	try{
		//construct TableAPI endpoint
		var endpoint = "https://"+instance_name+"/api/now/table/"+table_name;
		
		//Get HTTPRequest object for the endpoint
		var http_request = new GlideHTTPRequest(endpoint); 
		
		//Set Basic Authentication credentails.
		http_request.setBasicAuth(user_name, password);

		//Setting timeout duration in milliseconds 
		http_request.setHttpTimeout(timeout);

		//Set the Query Parameters
		http_request.addParameter("sysparm_limit",record_count);
		http_request.addParameter("sysparm_fields",table_fields);
		http_request.addParameter("sysparm_display_value","true");

		//Execute the get() method on the GlideHTTPRequest object to retirve the HTTPResponse.
		var http_response = http_request.get();

		if(http_response.getErrorMessage() != null){
			//Show ERROR in case of request failed to process.
			gs.print("ERROR : "+http_response.getErrorMessage());
		}else{
			//Display the response message
			var response_body = http_response.getBody();
			gs.print("Response Body is :\n"+response_body);
		}
	}catch(ex){
		// Prints any unhandled exception
		gs.print("Exception : "+ex);
	}
}
