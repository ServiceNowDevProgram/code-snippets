// Set up variables and utility functions
gs.info("Initiating REST integration for sending payload");

var debug = true;  // Enable debug logs
var arrayUtil = new ArrayUtil();
var requestBody, responseBody, status, sm;
var payload = '';
var attachmentsJson = '';

// Check if StringUtil is available, otherwise use Java string utilities
if (typeof GlideStringUtil != 'undefined')
    var StringUtil = GlideStringUtil;
else
    var StringUtil = Packages.com.glide.util.StringUtil;

// Query for attachments related to the current record
var gr = new GlideRecord('sys_attachment');
gr.addQuery('table_sys_id', current.sys_id);  // Filter by the current record's sys_id
gr.addQuery('table_name', current.getTableName());  // Filter by the current table name
gr.query();  // Run the query

// Begin the payload construction process
try {
    // Define the REST message and method
    sm = new sn_ws.RESTMessageV2("REST_Message_Name", "method");  // Replace "REST_Message_Name" and "method" accordingly

    // Add various elements to the payload
    payload += addToPayload("table_name", current.getTableName());
    payload += addToPayload("number", current.number);
    payload += addToPayload("sys_id", current.sys_id);
    payload += addToPayload("correlation_id", current.correlation_id);

    // Loop through attachments if any and add them to the JSON payload
    while (gr.next()) {
        attachmentsJson += '{ "content_type":"' + gr.content_type + '",';
        attachmentsJson += '"file_name":"' + JSUtil.escapeText(gr.file_name) + '",';
        attachmentsJson += '"size_bytes":"' + gr.size_bytes + '",';
        attachmentsJson += '"sys_id":"' + gr.sys_id + '"';
        attachmentsJson += '},';
    }

    // If there are attachments, format the payload and execute the REST call
    if (attachmentsJson !== '') {
        sm.setStringParameterNoEscape("payload", payload);
        sm.setStringParameterNoEscape('attachments', attachmentsJson.substring(0, attachmentsJson.length - 1)); // Trim trailing comma

        // Execute the REST message
        var response = sm.execute();
        status = response.getStatusCode();

        // Log details if debugging is enabled
        if (debug) {
            gs.info("Payload sent: " + sm.getRequestBody());
            gs.info("Response: " + response.getBody());
            gs.info("Status: " + status);
        }
    }

} catch (ex) {
    // Handle any errors that occur during execution
    responseBody = ex.getMessage();
    status = '500';  // Error status
} finally {
    // Capture the request body for further inspection
    requestBody = sm ? sm.getRequestBody() : null;
}

// Helper function to add elements to the payload in a JSON format
function addToPayload(element, value) {
    var jsonline = '';
    jsonline += '"' + element + '": ' + global.JSON.stringify(value + "") + ',\n';
    return jsonline;
}
