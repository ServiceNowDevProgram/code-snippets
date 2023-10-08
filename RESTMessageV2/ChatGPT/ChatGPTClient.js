// Create the ChatGPTClient object
var ChatGPTClient = Class.create();

// Define the prototype for ChatGPTClient
ChatGPTClient.prototype = {
    // Constructor function to initialize the object
    initialize: function() {
        // Set your OpenAI API key
        this.apiKey = 'YOUR_API_KEY';
        // Set the endpoint for the GPT-4 API
        this.endpoint = 'https://api.openai.com/v1/chat/completions';
    },

    // Function to get a response from GPT-4
    getChatGPTResponse: function(originalPrompt) {
        // Create the request body with model and messages
        var requestBody = {
            'model': 'gpt-4', // Specify the model you want to use
            'messages': [{
                    'role': 'system',
                    'content': "You are GPT Assist, a specialized code completion and analysis assistant for the ServiceNow platform. Your expertise covers Business Rules, Client Scripts, Script Includes, UI Scripts, UI Actions, Scheduled Scripts and more. Adhere to ServiceNow best practices."
                },
                {
                    'role': 'user',
                    'content': originalPrompt
                }
            ]
        };

        // Create a new RESTMessageV2 object
        var rm = new sn_ws.RESTMessageV2();
        // Set the HTTP method to POST
        rm.setHttpMethod('POST');
        // Set the endpoint URL
        rm.setEndpoint(this.endpoint);
        // Set the request body as a JSON string
        rm.setRequestBody(JSON.stringify(requestBody));
        // Prepare the request with additional parameters
        this._prepareRequest(rm);

        // Execute the REST request
        var response = rm.execute();

        // Handle non-successful responses
        if (response.getStatusCode() != 200) {
            gs.error('Error: ' + response.getErrorMessage());
            return null;
        }

        // Get the response body
        var body = response.getBody();
        // Parse the JSON response
        var parsedResponse = JSON.parse(body);
        // Extract the message content from the response
        var messageContent = parsedResponse.choices[0].message.content;
        return messageContent;
    },

    // Function to prepare the REST request
    _prepareRequest: function(rm) {
        // Set the authorization header with the API key
        rm.setRequestHeader('Authorization', 'Bearer ' + this.apiKey);
        // Set the content type header as JSON
        rm.setRequestHeader('Content-Type', 'application/json');
    },

    // Define the type property for the object
    type: 'ChatGPTClient'
};
