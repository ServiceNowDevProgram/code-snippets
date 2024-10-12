// JIRA REST API Endpoint
var jiraEndpoint = 'https://your-jira-instance.atlassian.net/rest/api/latest/issue';

// Authentication
var user = 'your_email@example.com'; 
var token = 'your_api_token';
var auth = 'Basic ' + gs.base64Encode(user + ':' + token);  // Scoped Base64 Encode
// var auth = 'Basic ' + GlideStringUtil.base64Encode(user + ':' + token); // Global Base64 Encode


// JIRA Payload
var requestBody = {
    "fields": {
        "project": {
            "key": "PROJECT_KEY"  // Project Key in JIRA
        },
        "summary": "Task Summary",
        "description": "Task Description",
        "issuetype": {
            "name": "Task"  // Issue type
        }
    }
};

// REST API Call
var request = new sn_ws.RESTMessageV2();
request.setHttpMethod('POST');
request.setEndpoint(jiraEndpoint);
request.setRequestHeader('Authorization', auth);
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestBody(JSON.stringify(requestBody));

// Execute the request
var response = request.execute();
var responseBody = response.getBody();
var httpStatus = response.getStatusCode();

// Log response for debugging
gs.info('JIRA Response Status: ' + httpStatus);
gs.info('JIRA Response Body: ' + responseBody);
