var GetServiceDeskAgentHelpAIUtil = Class.create();
GetServiceDeskAgentHelpAIUtil.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

  /**
     * Main function that processes a search term from a client-side call,
     * sends it to a Databricks-powered AI, and returns the response.
     * This function is intended to assist Service Desk agents.
     *
     * @returns {string} A JSON string containing the AI's response, model details, and metrics.
     */
    getSearchResults: function() {
        // Defines the use case for logging and metric purposes.
        var usecase = "ServiceDesk Helper";
        // Gets the current user's Sys ID, though it is not used in the current implementation.
        var user = gs.getUserID();
        // Retrieves the search term passed from the client-side script.
        var searchText = this.getParameter("sysparm_search_key");
        // Replaces double quotes with single quotes in the search text to prevent JSON parsing issues.
        searchText = searchText.replaceAll('"', "'");
        
        var searchObj = {
            "searchValue": searchText.toString()
        };

        // Extracts the raw search value from the object.
        var search = searchObj["searchValue"];

        // This object is structured to create a prompt for another potential AI endpoint (possibly for a brief statement),
        // but it is currently not used.
        var brief_statement_payload = {
            "messages": [{
                    "role": "system",
                    "content": "You are an Expert ServiceNow bot that helps the users to create an incident"
                },
                {
                    "role": "user",
                    "content": gs.getProperty('user.prompt') + search
                }
            ]
        };

        var databricks_model_response = {};
        // Calls the internal method to get the response from the Databricks model.
        var response = this.getDataBricksModelResponse(search);
        // UNCOMMENT THIS WHEN WE HAVE A PROPER SOLUTION FOR BRIEF RESPONSE GENERATION
        // var brief_response = this.getBriefResponse(brief_statement_payload);
        // The brief response is hardcoded to an empty JSON object
        // Assigns the model response to the output object.
        databricks_model_response.modelResponse = response;
        // Assigns a hardcoded model ID.
        databricks_model_response.model_id = "Databricks Runbook";

        // Converts the final response object to a JSON string for client-side processing.
        databricks_model_response = JSON.stringify(databricks_model_response);
        // Logs the final JSON string for debugging purposes.
        gs.info("Service Desk Helper Results: Testing value of the final databricks response being sent: " + databricks_model_response);

        // Returns the JSON string to the calling client script.
        return databricks_model_response;
    },

    /**
     * This function calls the Databricks endpoint via a Flow Designer action
     * to generate an answer for the user's query.
     *
     * @param {string} search - The user's search query.
     * @returns {string} A JSON string containing the AI's response, the current date, and a trace ID.
     */
    getDataBricksModelResponse: function(search) {
        try {
            var inputs = {};
            // Maps the search query to the input expected by the flow action.
            inputs['search_query'] = search;

            // Executes the specified Flow Designer action with the provided inputs.
            // The action is run in the foreground, meaning the script will wait for a response.
            var result = sn_fd.FlowAPI.getRunner().action('global.genai_action').inForeground().withInputs(inputs).run();
            // Retrieves the outputs from the completed flow action.
            var outputs = result.getOutputs();

            // Extracts the model output from the flow action outputs.
            var model_output = outputs['model_output'];
            // Attempts to parse and extract vector response data, though the variable is not used after this line.
            var databricks_vector_response = JSON.parse(model_output).databricks_output.trace.data.spans;

            // Logs the raw response from the Databricks model for debugging.
            gs.info("Helper Results: Databricks flow action response: " + JSON.stringify(model_output));

            var current_date = new GlideDateTime();
            var output = {};
            // Parses the model output to extract the AI's content.
            output.response = JSON.parse(model_output).choices[0].message.content;
            // Adds the current date to the output object.
            output.date = current_date.getDisplayValue();
            // Logs the trace ID for tracking purposes.
            gs.info("Helper Results: GEN AI flow action TraceID value: " + JSON.parse(model_output).id);
            // Adds the trace ID to the output object.
            output.traceID = JSON.parse(model_output).id;
            // Returns the constructed output object as a JSON string.
            return JSON.stringify(output);

        } catch (ex) {
            // Catches any exceptions during the flow execution and logs an error.
            var message = ex.getMessage();
            gs.error(message);
        }
    },

  type: 'GetServiceDeskAgentHelpAIUtil'
});
