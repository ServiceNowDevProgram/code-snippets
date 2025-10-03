var incidentGR = new GlideRecord('incident');

// Replace with actual incident number or sys_id
if (incidentGR.get('number', 'INC0010001')) {  // any incident
    var changeGR = new GlideRecord('change_request');
    changeGR.initialize();

    // Copy relevant fields from incident to change request
    changeGR.short_description = 'Change for Incident: ' + incidentGR.short_description;
    changeGR.description = incidentGR.description;
    changeGR.priority = incidentGR.priority;
    changeGR.impact = incidentGR.impact;
    changeGR.urgency = incidentGR.urgency;
    changeGR.category = incidentGR.category;
    changeGR.caller_id = incidentGR.caller_id;
    changeGR.cmdb_ci = incidentGR.cmdb_ci; // If CI is linked
    changeGR.assignment_group = incidentGR.assignment_group;
    changeGR.assigned_to = incidentGR.assigned_to;

    // Insert the new change request
    var newChangeID = changeGR.insert();
    gs.info('New Change Request created with sys_id: ' + newChangeID);
} else {
    gs.info('Incident not found');
}
