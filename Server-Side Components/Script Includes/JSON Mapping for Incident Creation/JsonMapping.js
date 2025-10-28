function createIncidentsFromJSON(payload) {
    	var data = JSON.parse(payload);
    	// Check if Data is Array or not, If not then add into array
    	var dataArray = Array.isArray(data) ? data : [data];	


	dataArray.forEach(function(item) {	 	
    		var gr = new GlideRecord('incident');
    		gr.initialize();

    		for (var key in item) {
        		if (gr.isValidField(key)) {
            			gr[key] = item[key];
        		}
    		}
    		var incidentSysId = gr.insert();
		gs.info("Incident created with Sys ID: " + incidentSysId);	
	});
}

// Usage with a single object
var singlePayload = '{"short_description":"System Down","caller_id":"durgesh1@example.com","priority":1,"assignment_group":"IT Support"}';
createIncidentsFromJSON(singlePayload);

// Usage with an array of objects
var arrayPayload = '[{"short_description":"System Down","caller_id":"durgesh2@example.com","priority":1,"assignment_group":"IT Support"}, {"short_description":"Email Issue","caller_id":"durgesh3@example.com","priority":2,"assignment_group":"IT Support"}]';
createIncidentsFromJSON(arrayPayload);