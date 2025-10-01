This utility contains a scripted REST API which helps to insert tags in records with required parameters.

Below is the REST endpoint to access this SRAPI.

https://<<YOUR_INSTANCE_NAME>>>.service-now.com/api/gmi/insert_tags

Sample Code to call this SRAPI is below:

```r
var request = new sn_ws.RESTMessageV2();
request.setEndpoint('https://<<YOUR_INSTANCE_NAME>>>.service-now.com/api/gmi/insert_tags');
request.setHttpMethod('POST');

//Eg. UserName="admin", Password="admin" for this code sample.
var user = 'admin';
var password = 'admin';

request.setBasicAuth(user,password);
request.setRequestHeader("Accept","application/json");
request.setRequestHeader('Content-Type','application/json');
request.setRequestBody("{
    \"title\": \"my test7\",
     \"read\": \"yes\",
    \"table\" : \"cmdb_ci_computer\",
     \"table_key\" : \"aac0b1213784200044e0bfc8bcbe5de3\"
    

}");
var response = request.execute();
gs.log(response.getBody());

```

Sample Payload is below:

```r

{
    "title": "my test7",
     "read": "yes",
    "table" : "cmdb_ci_computer",
     "table_key" : "aac0b1213784200044e0bfc8bcbe5de3"
    

}

```
