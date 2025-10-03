var request = new sn_ws.RESTMessageV2();
request.setEndpoint('https://instance_name.service-now.com/api/now/v1/email');
request.setHttpMethod('POST');
//Eg. UserName="admin", Password="admin" for this code sample.
var user = '';
var password = '';
var body = {
  "to": [
    "admin@example.com",
    "andrew.och@example.com"
  ],
  "subject": "Hacktoberfest 2025",
  "text": "Lets gooooooooooo!",
  "table_name": "incident",
  "table_record_id": "d71f7935c0a8016700802b64c67c11c6"
}
request.setBasicAuth(user,password);
request.setRequestHeader("Accept","application/json");
request.setRequestHeader('Content-Type','application/json');request.setRequestBody(JSON.stringify(body));
var response = request.execute();
gs.log(response.getBody());
gs.log(response.getStatusCode());
