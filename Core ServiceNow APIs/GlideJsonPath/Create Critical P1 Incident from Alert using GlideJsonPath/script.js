try {
        // Get the JSON payload from the request body.
        var requestBody = request.body.dataString;

        // Use GlideJsonPath to parse the JSON payload efficiently.
        var gjp = new GlideJsonPath(requestBody);

        // Extract key information from the JSON payload.
        var severity = gjp.read("$.alert.severity");
        var shortDescription = gjp.read("$.alert.description");
        var source = gjp.read("$.alert.source");
        var ciName = gjp.read("$.alert.configuration_item");
        var ciSysId = gjp.read("$.alert.ci_sys_id");

        // Validate that mandatory fields are present.
        if (!shortDescription || severity != 'CRITICAL') {
            response.setStatus(400); // Bad Request
            response.setBody({
                "status": "error",
                "message": "Missing mandatory alert information or severity is not critical."
            });
            return;
        }
        
        // Use GlideRecordSecure for added security and ACL enforcement.
        var grIncident = new GlideRecordSecure('incident');
        grIncident.initialize();
        
        // Set incident field values from the JSON payload.
        grIncident.setValue('short_description', 'INTEGRATION ALERT: [' + source + '] ' + shortDescription);
        grIncident.setValue('description', 'A critical alert has been received from ' + source + '.\n\nAlert Details:\nSeverity: ' + severity + '\nDescription: ' + shortDescription + '\nCI Name: ' + ciName);
        grIncident.setValue('source', source);
        grIncident.setValue('impact', 1); // Set Impact to '1 - High'
        grIncident.setValue('urgency', 1); // Set Urgency to '1 - High'
        grIncident.setValue('priority', 1); // Set Priority to '1 - Critical'

        // If a CI sys_id is provided, set the Configuration Item.
        if (ciSysId) {
            grIncident.setValue('cmdb_ci', ciSysId);
        }
        
        // Insert the new incident record and store its sys_id.
        var newIncidentSysId = grIncident.insert();
        
        if (newIncidentSysId) {
            // Get the incident number for the successful response.
            var incNumber = grIncident.getRecord().getValue('number');
            
            // Log the successful incident creation.
            gs.info('Critical P1 incident ' + incNumber + ' created from alert from ' + source);
            
            // Prepare the success response.
            var responseBody = {
                "status": "success",
                "message": "Critical incident created successfully.",
                "incident_number": incNumber,
                "incident_sys_id": newIncidentSysId
            };
            response.setStatus(201); // Created
            response.setBody(responseBody);
        } else {
            // Handle database insertion failure.
            response.setStatus(500); // Internal Server Error
            response.setBody({
                "status": "error",
                "message": "Failed to create the incident record."
            });
        }
        
    } catch (ex) {
        // Handle any exceptions during processing.
        gs.error('An error occurred during critical alert incident creation: ' + ex);
        response.setStatus(500);
        response.setBody({
            "status": "error",
            "message": "An internal server error occurred."
        });
    }
