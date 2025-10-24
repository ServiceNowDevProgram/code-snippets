/*
HTTP Method: GET
Relative Path: /request_item/{sys_id} (we added /request_item because we'll probably end up building something similar for record producers 
the script include we built is already set up to determine whether the provided sys_id is for a Request Item or a Catalog Task).
*/

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var taskId = decodeURI(request.pathParams.sys_id);
	var result = [];
	var varHandler = new CHVarUtils();
	result = varHandler.getTaskVarsById(taskId);
	if(!result)
		return sn_ws_err.NotFoundError("No variables found, please ensure you are passing a valid ServiceNow task record System ID (sys_id)");
		
	return result;

})(request, response);
