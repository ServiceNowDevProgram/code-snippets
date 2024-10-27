(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	function isNull(obj){
		return(obj == '' || obj == undefined  || obj == 'undefined' || obj == null || obj == 'null');
	}

	//Get data from request
	var requestBody = request.body;
	var requestData = requestBody.data;
	
	//Get table name from request
	var tableName = requestData.table;

	//Get sys_id from request
	var sysId = requestData.sysId;

	//Make sure data exists
	if(isNull(tableName) || isNull(tableName.toString()) || isNull(sysId) || isNull(sysId.toString())){
		response.setStatus(400);
		return;
	}
	
	//Start lookup
	var rGr = new GlideRecord(tableName);
	rGr.get('sys_id', sysId);

	var recordExists = !rGr.sys_id == '';

	response.setBody(recordExists ? "Resource exists." : "Resource does not exist.");
	response.setStatus(recordExists ? 200 : 404);

})(request, response);