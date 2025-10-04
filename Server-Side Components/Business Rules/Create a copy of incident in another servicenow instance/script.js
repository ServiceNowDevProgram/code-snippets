//This is after business rule in production instance

(function executeRule(current, previous /*null when async*/) {

	var body = {"short_description":current.short_description.toString(),"description":current.short_description.toString()}; //more fields can be added to body
	
	var req = new sn_ws.RESTMessageV2();
	req.setEndpoint("https://<your-instance-name>.service-now.com/api/now/table/incident");    //give backup(non-prod) instance name
	req.setHttpMethod("POST");
	req.setBasicAuth("<username>","<password>");   //username and password of a user of backup(non-prod) instance. User must have rest_service and itil role
	req.setRequestHeader("Content-Type","application/json");
	req.setRequestBody(JSON.stringify(body));
	
	var response = req.execute();
	
	var body = response.getBody();
	var status = response.getStatusCode();

  gs.log("Response body is ---- " +body);  //response body is logged for verification
  gs.log("Status code is ---- " +status);  //status code is logged. Usually 200 or 201 is success

})(current, previous);
