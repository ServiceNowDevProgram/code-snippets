// Configuration: Update these values based on your requirements
var tableName = 'incident';         // Target table (e.g., incident, change_request, task)
var recordSysId = '8d6353eac0a8016400d8a125ca14fc1f'; // Sys ID of the target record
var fileName = 'api_response.json'; // Name of the attachment file
var apiUrl = 'https://api.example.com/data'; // URL of the API endpoint

// Initialize RESTMessageV2 to make the request
var request = new sn_ws.RESTMessageV2();
request.setHttpMethod('GET');           // Set HTTP method (GET, POST, etc.)
request.setEndpoint(apiUrl);             // Set API endpoint URL

// Optional: Set headers or authentication if needed
// request.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
// request.setBasicAuth('username', 'password');

// Configure RESTMessageV2 to automatically save the response as an attachment
request.saveResponseBodyAsAttachment(tableName, recordSysId, fileName);

// Execute the request and log the result
try {
    var response = request.execute();
    var httpResponseStatus = response.getStatusCode();
    var httpResponseContentType = response.getHeader('Content-Type');
    
    // Log the status and content type for debugging
    gs.debug("HTTP Response Status Code: " + httpResponseStatus);
    gs.debug("HTTP Response Content-Type: " + httpResponseContentType);
    
    if (httpResponseStatus === 200) {
        gs.info("Attachment created successfully for record: " + recordSysId);
    } else {
        gs.error("Failed to create attachment. HTTP Status: " + httpResponseStatus);
    }
} catch (ex) {
    gs.error("An error occurred: " + ex.message);
}
