// Table and fields you want to include
var tableName = 'incident'; // Change to any table you like
var fieldsToInclude = ['number', 'short_description', 'state', 'assigned_to', 'sys_created_on'];// Change whichever field you wish for

// Store all incident data here
var incidentList = [];

// Get active incidents
var gr = new GlideRecord(tableName);
gr.addQuery('active', true);
gr.query();

// Go through each record and build a friendly object
while (gr.next()) {
    var incidentObj = {};
    
    fieldsToInclude.forEach(function(field) {
        if (gr.isValidField(field) && gr[field].getRefRecord) {
            // Get display value for reference fields
            incidentObj[field] = gr[field].getDisplayValue();
        } else if (gr.isValidField(field)) {
            incidentObj[field] = gr[field].toString();
        } else {
            incidentObj[field] = null;
        }
    });

    // Add human-readable state
    var stateMap = {
        '1': 'New',
        '2': 'In Progress',
        '3': 'On Hold',
        '6': 'Resolved',
        '7': 'Closed'
    };
    incidentObj.state_label = stateMap[incidentObj.state] || 'Unknown';

    incidentList.push(incidentObj);
}

// Convert the list to JSON in a readable format
var jsonOutput = JSON.stringify(incidentList, null, 2);

// Show the JSON output in system logs
gs.info("Here’s your JSON for active incidents:\n" + jsonOutput);
