getDevices: function(importSetTable) {
        var endPoint = null;
        var isEndofDevices = false;

        while (!isEndofDevices) {
            // Call REST Message Method
            var url = new sn_ws.RESTMessageV2('Servicenow-Rest', 'GetDevice');

            if (endPoint !== null) {
                url.setEndpoint(endPoint); // Set the endpoint from REST Message method
            }

            var response = url.execute(); // Execute endpoint
            var responseBody = response.getBody(); // Capture the response body
            var httpStatus = response.getStatusCode(); // Capture response status code (200 for success)

            // Parse the response to JSON format
            var parsedResponse = JSON.parse(responseBody);
            var deviceData = parsedResponse.value;

            // Loop through each record and insert data into import set table
            for (var i = 0; i < deviceData.length; i++) {
                importSetTable.insert(deviceData[i]);
            }

            if (parsedResponse["@odata.nextLink"]) { // Pagination : Check if response has next link 
                // Copy next data link to endPoint variable
                endPoint = parsedResponse["@odata.nextLink"];
            } else {
                isEndofDevices = true;
            }
        } // End of while loop
    }, 
Calling from datasource

 var data = new Utils().getDevices(import_set_table);
