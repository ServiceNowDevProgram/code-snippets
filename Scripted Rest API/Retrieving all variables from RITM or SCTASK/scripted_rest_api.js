// Scripted REST Api

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var taskId = decodeURI(request.pathParams.sys_id);
	var result = [];
	var varHandler = new CHVarUtils(); 
	result = varHandler.getTaskVarsById(taskId);
	if(!result)
		return sn_ws_err.NotFoundError("No variables found, please ensure you are passing a valid ServiceNow task record System ID (sys_id)");
		
	return result;

})(request, response);
