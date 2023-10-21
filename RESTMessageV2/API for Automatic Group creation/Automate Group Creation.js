var request = new sn_ws.RESTMessageV2();
request.setEndpoint('https://instance_name.service-now.com/api/now/table/sys_user_group'); //Target Instance 
request.setHttpMethod('POST');
var user = 'username';
var password = 'password';
request.setBasicAuth(user, password);
request.setRequestHeader("Accept", "application/json");
request.setRequestHeader("Content-Type', 'application/json'); 
//set new group required field values
request.setRequestBody(" {\"name\":\"Group Name\",\"manager\":\"sys_id of the manager\",\"description\":\"Creating group with API\",\"type\":\"sys_id of the group type (GlideList)\"}"); 
var response = request.execute();


