/* 
*PLEASE REPLACE devxxxxx TO YOUR RELEVANT INSTANCE DOMAIN ex:dev67089.serice-now.com
*PLEASE ADD YOUR RELEVANT USERNAME AND PASSWORD 
*/

//url that need to be shortenered
var urlToShortern = "https://devxxxxx.service-now.com/incident_list.do?sysparm_query=caller_id%3D681ccaf9c0a8016400b98a06818d57c7%5Epriority%3D1%5Estate%3D2%5Esys_updated_by%3Dadmin%5Eshort_description%3DManager%20can%27t%20access%20SAP%20Controlling%20application&sysparm_first_row=1&sysparm_view=";

//we just need user who can login into instance even if he dont have roles also fine
var username = ‘ADD_YOUR_USERNAME’;  
var password = 'ADD_YOUR_PASSWORD’;  

//BELOW CODE NEED NO CHANGES

var request = new sn_ws.RESTMessageV2();
// SN Api that we use for generating tiny url
request.setEndpoint(gs.getProperty('glide.servlet.uri')+'api/now/tinyurl');  
request.setHttpMethod('POST');

var body={};
body.url=urlToShortern;  

request.setBasicAuth(username, password);
request.setRequestHeader("Accept", "application/json");
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestBody(JSON.stringify(body));

var response = request.execute();
var responseBody = JSON.parse(response.getBody());
var tinyUrl = responseBody.result; //IT WILL HAVE OUR REQUIRED TINY URL 

gs.info(tinyUrl);  
