This is a server-side Script Include that contains the core logic. It reads the endpoint configurations from a System Property, parses the JSON, and returns the appropriate URL based on the current instance's name.

System Property: x_my_scope.api.endpoints
This property stores a JSON object containing the endpoint URLs for each environment. It must be created and populated in each instance that uses the utility.

Sample JSON object:
{
  "dev": "https://dev-instance.example.com/api",
  "test": "https://test-instance.example.com/api",
  "prod": "https://prod-instance.example.com/api"
}

Usage:
var endpointConfig = new EndpointConfig();
var endpointUrl = endpointConfig.getEndpoint();    
if (endpointUrl) 
{
gs.info("Endpoint URL: " + endpointUrl);  
//Use the endpointUrl in your REST call
  var request = new sn_ws.RESTMessageV2();
  request.setEndpoint(endpointUrl);
// ... rest of your integration logic        
} else 
{
gs.error("Failed to retrieve endpoint URL.");
}
    
