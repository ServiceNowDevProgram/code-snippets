/* 
This fix script is used to login to API that have header as ' x-www-form-urlencoded' below script is used to login  and get the token and do the operation
*/

(function execute(inputs, outputs) {
var body = "grant_type=credentials&username=<UserName>-snow&password=<Password>";

try { 
var r = new sn_ws.RESTMessageV2();
r.setEndpoint("http:<API Endpoint Details>/api/jwt/login"); 
//r.setRequestHeader("Accept", "application/json");
r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
r.setRequestBody(body);
r.setMIDServer('Mid Server Link');
r.setHttpMethod('POST'); // Post call to get the Token

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
