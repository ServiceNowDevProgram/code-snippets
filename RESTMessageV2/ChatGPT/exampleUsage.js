// Create a new ChatGPTClient instance
var gptClient = new ChatGPTClient();

// Define the prompt for the GPT-4 model
var prompt = "In ServiceNow, I need a JavaScript business rule that triggers when a record is either inserted or updated in the 'incident' table. The rule should first check if the 'active' field is set to true. If it is true, the rule should then update the 'state' field to 1. Additionally, please ensure that the script adheres to ServiceNow best practices, includes necessary error handling, and covers the entire script. Your response should provide the complete code for this business rule.";

// Get a response from the GPT-4 model using the defined prompt
var response = gptClient.getChatGPTResponse(prompt);

// Log the JSON response with proper formatting
gs.info(JSON.stringify(response, null, '\t'));
