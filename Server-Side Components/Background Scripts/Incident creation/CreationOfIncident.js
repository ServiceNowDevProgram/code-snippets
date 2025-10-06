    var incident = new GlideRecord('incident');
    incident.initialize();
    incident.short_description = 'Sample Incident Created via Script';
    incident.description = 'This incident was created using a GlideRecord script.';
    incident.caller_id = gs.getUserID(); // Sets the current user as the caller
    incident.priority = 3; // Medium priority
    incident.category = 'inquiry'; // Example category
    incident.insert();
