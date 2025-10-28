/*
This fix script is created to make a post call using scripted REST API when header type is 'application/x-www-form-urlencoded' to get the token and authenticate
*/

(function execute(inputs, outputs) {
var body = "grant_type=credentials&username=<UserName>-snow&password=<Password>";

try { 
var r = new sn_ws.RESTMessageV2();
r.setEndpoint("http:<API Endpoint Details>/api/jwt/login"); 
//r.setRequestHeader("Accept", "application/json");
r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
r.setRequestBody(body);
r.setMIDServer('<Mid Server Link>'); // Enter your Mid Server
r.setHttpMethod('POST');

var response = r.execute();
r.setHttpTimeout(30000); // Set Time Out 
var responseBody = response.getBody();
var httpStatus = response.getStatusCode(); // Get Status code to determine success or Faliure
    gs.info("Status >>>>"+httpStatus);
    gs.info("responseBody >>>>"+responseBody);
    outputs.token_value = responseBody;
  outputs.status = httpStatus;
}
catch(ex) {
var message = ex.message;
}
})(inputs, outputs);
