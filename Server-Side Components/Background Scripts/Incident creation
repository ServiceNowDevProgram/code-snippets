// This script can be used in a Script Include or Business Rule
var incidentGR = new GlideRecord('incident');
incidentGR.initialize();
incidentGR.short_description = 'Critical Incident - Immediate Attention Required';
incidentGR.description = 'This is a Priority 1 incident created via script.';
incidentGR.priority = 1; // Priority 1
incidentGR.impact = 1;   // High impact
incidentGR.urgency = 1;  // High urgency
incidentGR.caller_id = gs.getUserID(); // Sets the current user as the caller
incidentGR.category = 'network'; // Example category
incidentGR.insert();
