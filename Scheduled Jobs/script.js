// Define the current date and the cutoff date (30 days ago)
var currentDate = new GlideDateTime();
currentDate.addDays(-30);
var cutoffDate = currentDate.getDisplayValue();

// Create a GlideRecord for the Incident table
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('sys_created_on', '<=', cutoffDate);
incidentGR.addQuery('state', '!=', 7); // Exclude already closed incidents (state 7)
incidentGR.query();

while (incidentGR.next()) {
    // Set mandatory fields
    incidentGR.close_notes = 'Automatically closed due to inactivity.';
    incidentGR.resolution_notes = 'Closed due to inactivity. No further action required.';
    
    // Set the state to Closed (7) 
    incidentGR.state = 7;
    incidentGR.update();
    
    // Optional: Log the closed incident for reference
    gs.info('Incident ' + incidentGR.number + ' closed automatically.');
}
