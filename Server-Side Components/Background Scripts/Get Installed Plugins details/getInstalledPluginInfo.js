//Get the instance
var instance_name = gs.getProperty("instance_name");

//build the endpoint
var endPoint = 'https://'+instance_name+'.service-now.com/api/sn_appclient/appmanager/apps?tab_context=installed';

//initialize the RestMessageV2 API.
var request = new sn_ws.RESTMessageV2();
request.setEndpoint(endPoint);
request.setHttpMethod('POST');

//Eg. UserName="admin", Password="admin" for this code sample.
var user = 'admin';
var password = '****'; 

//set the authentication
request.setBasicAuth(user,password);

//set the request header
request.setRequestHeader("Accept","application/json");

//invoke the API
var response = request.execute();

//Parse the response
var jsonResponse = JSON.parse(response.getBody());

var appsList = jsonResponse.result.apps;

//Print the Header for the response
gs.info("Application name"+" | "+ "Assigned version"+" | " + "Latest version | "  + "Hasupdate");
appsList.forEach(function(app){
    //Print the plugin details
   var hasUpdate = app.update_available == 1 ? "true" : "false";
gs.info(app.name+" | "+ app.assigned_version+" | " + app.latest_version+" | " + hasUpdate);
});
