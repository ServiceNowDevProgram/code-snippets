GetServiceDeskAgentHelpAIUtil
Overview
This is a client-callable Script Include designed for the ServiceNow platform that integrates with an external Databricks AI endpoint. Its purpose is to assist Service Desk agents by providing AI-generated responses to user queries, which can be used to populate incident information or assist in troubleshooting.
The script acts as a server-side proxy, handling the client-side request, invoking a Flow Designer Action to communicate with the Databricks service, and returning the AI's response to the client.
Features
AI-Powered Responses: Sends user search queries to a Databricks-powered Generative AI model to get intelligent answers.
Client-Callable: Can be invoked from client-side scripts (e.g., a UI Action or Client Script) using GlideAjax.
Flow Designer Integration: Uses a Flow Designer Action to execute the REST call to the Databricks endpoint, centralizing the external API logic.
Structured Output: Returns a JSON object containing the AI's response, model metadata, and a trace ID for debugging.
Prerequisites
ServiceNow Configuration
Flow Designer Action: A Flow Designer Action named global.genai_action must be created and configured to handle the REST call to the Databricks AI endpoint. This action must have:
An input named search_query (String).
An output named model_output (String).
Databricks Connection: The Flow Designer Action must be correctly configured with the necessary credentials to connect to the external Databricks API.
System Property: A system property named user.prompt is referenced in the script. It should be created and configured with the required prompt text for the AI.
How to use
1. Calling from a Client Script
You can use GlideAjax to call the getSearchResults function from a client-side script, such as a UI Action or a Catalog Client Script.
javascript
// Example client-side script using GlideAjax
var ga = new GlideAjax('GetServiceDeskAgentHelpAIUtil');
ga.addParam('sysparm_name', 'getSearchResults');
ga.addParam('sysparm_search_key', g_form.getValue('short_description')); // Pass the user's input
ga.getXML(getResponse);

function getResponse(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    if (answer) {
        var result = JSON.parse(answer);
        g_form.setValue('comments', result.modelResponse); // Set the AI response in a field
    }
}
Use code with caution.

2. Using from a Server Script
The functions can also be called directly from other server-side scripts (e.g., Business Rules).
javascript
// Example server-side script
var searchKey = 'What are the steps to reset my password?';
var aiUtil = new GetServiceDeskAgentHelpAIUtil();
var response = aiUtil.getSearchResults(searchKey);

gs.info(response);
Use code with caution.

Script details
getSearchResults()
This is the main function that coordinates the process.
Retrieves the search term from the client parameters.
Calls the getDataBricksModelResponse() function to get the AI-generated answer.
Constructs a JSON object with the AI's response and model information.
Returns the JSON object as a string.
getDataBricksModelResponse(search)
This function handles the integration with the Databricks AI.
Takes the search query as a parameter.
Executes the global.genai_action Flow Designer Action.
Parses the model_output from the Flow Action's outputs.
Extracts the AI's message content and a trace ID for debugging.
Returns a stringified JSON object containing the AI's response, date, and trace ID.
Includes a try/catch block to handle and log potential errors during the integration process.
Dependencies
Flow Designer Action: global.genai_action
System Property: user.prompt
Troubleshooting
Check the Flow Execution: If the AI response is not received, check the Flow Designer execution logs to ensure global.genai_action is running successfully and the REST call to Databricks is returning a valid response.
Review System Logs: Examine the System Logs (gs.info and gs.error messages) for debugging information related to the script's execution or potential errors from the Databricks API.
Verify Databricks Credentials: Ensure that the credentials and configuration within the Flow Designer action for connecting to Databricks are correct.
