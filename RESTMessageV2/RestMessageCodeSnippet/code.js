(function() {
  // Define your REST API endpoint
  var apiUrl = 'https://www.endpointurl.com/data';

  try {
    // Make an HTTP request to the external API
    var response = new sn_ws.RESTMessageV2();
    response.setHttpMethod('get');
    response.setEndpoint(apiUrl);
    var responseBody = response.execute();
    
    // Parse the JSON response
    var parsedData = JSON.parse(responseBody.getBody());
    
    // Process the parsed data and update records in a table
    if (parsedData && parsedData.data) {
      var gr = new GlideRecord('your_table_name');
      gr.addQuery('active', true);
      gr.query();
      
      while (gr.next()) {
        // Update records with data from the API response
        gr.setValue('field1', parsedData.data.field1);
        gr.setValue('field2', parsedData.data.field2);
        gr.update();
      }
    } else {
      gs.error('API response did not contain the expected data.');
    }
  } catch (ex) {
    gs.error('An error occurred: ' + ex);
    
    // You can perform additional error handling or notification here
    // For example, send an email or create an incident record
  }
})();
