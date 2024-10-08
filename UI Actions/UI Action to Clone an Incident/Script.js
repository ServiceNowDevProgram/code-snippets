// UI Action: Clone Incident
// Table: incident
// Condition: current.state != 7 // Not Closed
// Client: false

(function executeAction(current) {
    var newIncident = new GlideRecord('incident');
    newIncident.initialize();
    newIncident.short_description = current.short_description;
    newIncident.description = current.description;
    newIncident.caller_id = current.caller_id;
    newIncident.priority = current.priority;
    newIncident.assignment_group = current.assignment_group;
    newIncident.insert(); // Create the new incident

    gs.addInfoMessage('Incident ' + current.number + ' has been cloned successfully.');
})(current);
