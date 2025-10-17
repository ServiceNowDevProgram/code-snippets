RestMessageUtils
A utility Script Include for simplifying REST API calls in ServiceNow using sn_ws.RESTMessageV2.
Features

Supports dynamic or named REST messages.
Easily set headers, query parameters, and request body.
Supports Basic Auth, Auth Profiles, and API Key authentication.
Optional MID Server configuration.
Handles variable substitution.
Centralized error handling with gs.error() logging.
Designed for use in Script Includes, Business Rules, or Scripted REST APIs.
Lightweight and reusable for multiple integrations.

Object Structure 
/*
ObjectStructure = {
    endPoint: 'enpoint',
    httpMethod: 'Add Method',
    queryParams: {
        key1: 'value',
        key2: 'value'
    },
    requestHeaders: {
    },
    authType: 'CHOICES among [BasicCreds,BasicAuthProfile,APIKEY]',
    authProfile: 'sysid of auth profile if authtype is selected as BasicAuthProfile',
    userName: 'userName',
    pasword: 'password',
    midServer: 'midServer',

}
*/

Example Usage
/*
var obj = {
    endPoint: 'https://instancename.service-now.com/api/now/table/problem',
    queryParams: {
        sysparm_query: 'active=true',
        sysparm_limit: 2,
        sysparm_fields: 'number,short_description'
    },
    httpMethod: 'POST',
    authType: 'BasicCreds',
    userName: 'admin',
    password: gs.getProperty('dev204127.admin.password'),
    requestHeaders: {
        Accept: 'Application/JSON'
    },
    

};
var resp = new RestMessageUtils(obj, 'Test RestMessage Utils', 'Default GET').execute();

gs.print(resp.getBody())
*/






