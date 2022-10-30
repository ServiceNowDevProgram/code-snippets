//creating issues in azure devops from servicenow

try{
    var content = {"op": "add", "path": "/fields/System.Title", "from": null, "value": "Sample Task"};


    var request = new sn_ws.RESTMessageV2();

    //replace the orgName and projectName with your own values
    request.setEndPoint('https://dev.azure.com/orgName/projectName/_apis/wit/workitems/$issue?api-version=6.0');

    //use the record in basic auth table
    request.setAuthenticationProfile('basic', 'test');	
    request.setRequestHeader('Content-Type', 'application/json-patch+json');
	request.setRequestBody(JSON.stringify(content));

    var response = request.execute();
    if(response.getStatusCode() == 200){
        gs.info('successful creation of issue');
    }
}
catch(ex) {
    gs.debug('Failing due to: ' + ex.message);
}