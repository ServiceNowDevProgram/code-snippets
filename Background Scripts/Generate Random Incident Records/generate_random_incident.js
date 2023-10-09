// Create a specified number of random incident records
var numberOfIncidents = 50;
var incidentTable = 'incident';
var incidentGR;

// Sample values for Category, Subcategory, Impact, and Urgency
var categories = ['Software', 'Hardware', 'Network'];
var subcategories = ['CPU', 'Disk','Memory', 'Monitor','Mouse', 'Email', 'Application', 'Desktop', 'Server', 'Router', 'VPN', 'DNS', 'DB2', 'MS SQL Server','Oracle'];
var impacts = [1, 2, 3]; // Low, Moderate, High
var urgencies = [1, 2, 3]; // Low, Moderate, High

// Sample array for requestedFor
var requestedForArray = [{
    "name": "Fred Luddy",
    "email": "fred.luddy@example.com"
}, {
    "name": "Beth Anglin",
    "email": "beth.anglin@example.com"
}, {
    "name": "System Administrator",
    "email": "admin@example.com"
}, {
    "name": "Joe Employee",
    "email": "employee@example.com"
}];

for (var i = 0; i < numberOfIncidents; i++) {
    // Create a new incident record
    incidentGR = new GlideRecord(incidentTable);
    incidentGR.initialize();

    // Set random values for incident fields
    incidentGR.description = 'This is a random incident generated for testing purposes.';
    incidentGR.category = categories[Math.floor(Math.random() * categories.length)];
    incidentGR.subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
    incidentGR.impact = impacts[Math.floor(Math.random() * impacts.length)];
    incidentGR.urgency = urgencies[Math.floor(Math.random() * urgencies.length)];
    incidentGR.short_description = 'Random Incident ' + (i + 1) + ' ' + incidentGR.category +
        ' ' + incidentGR.subcategory + incidentGR.impact + ' ' + incidentGR.urgency;
	
    // Set random values for AssignedTo, IssueDate
    var randomRequester = requestedForArray[Math.floor(Math.random() * requestedForArray.length)];
    incidentGR.assigned_to = randomRequester.name;
    incidentGR.requested_for = randomRequester.name;
    incidentGR.caller_id = "System Administrator"; // You can use your user name for easy identification.

    // Randomly set the state: New, In Progress, Resolved, Closed, or Canceled
    var stateRandom = Math.random();
    if (stateRandom < 0.2) {
        incidentGR.state = 3; // Resolved
        incidentGR.close_code = 'Solution provided'; // Set the resolution code
        incidentGR.resolved_date = gs.daysAgo(Math.floor(Math.random() * 30)); // Resolved within the last 30 days
        incidentGR.u_resolved_date = gs.daysAgo(Math.floor(Math.random() * 30)); // User created Resolved date within the last 30 days		
        incidentGR.close_notes = 'Randomly Resolved';
    } else if (stateRandom < 0.4) {
        incidentGR.state = 7; // Closed
        incidentGR.close_code = 'Solution provided'; // Set the resolution code
        incidentGR.resolved_date = gs.daysAgo(Math.floor(Math.random() * 30)); // Resolved within the last 30 days
        incidentGR.u_resolved_date = gs.daysAgo(Math.floor(Math.random() * 30)); // User created Resolved Date within the last 30 days		
        incidentGR.close_notes = 'Randomly Closed';
    } else if (stateRandom < 0.6) {
        incidentGR.state = 8; // Canceled
    } else if (stateRandom < 0.8) {
        incidentGR.state = 1; // New
        incidentGR.assigned_to = '';
    } else {
        incidentGR.state = 2; // In Progress
    }


    // Generate random issue_date within the last month
    var rightNow = new GlideDateTime();
    pickDate = (Math.floor(Math.random() * 60) - 30);
    rightNow.addDaysUTC(pickDate);
    incidentGR.setValue("issue_date", rightNow.getDate());
    incidentGR.setValue("u_issue_date", rightNow.getDate());

    // Insert the record
    incidentGR.insert();
}
