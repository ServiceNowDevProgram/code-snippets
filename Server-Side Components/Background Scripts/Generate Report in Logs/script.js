// Script: Generate Report in Logs
// Author: Bhavya
// Purpose: Print summary counts for incidents in the system logs

(function() {
    gs.print("=== Incident Summary Report ===");

    // Total number of incidents
    var total = new GlideAggregate('incident');
    total.addAggregate('COUNT');
    total.query();
    total.next();
    gs.print("Total Incidents: " + total.getAggregate('COUNT'));

    // High Priority incidents
    var high = new GlideAggregate('incident');
    high.addQuery('priority', 1);
    high.addAggregate('COUNT');
    high.query();
    high.next();
    gs.print("High Priority Incidents: " + high.getAggregate('COUNT'));

    // Active incidents
    var active = new GlideAggregate('incident');
    active.addQuery('active', true);
    active.addAggregate('COUNT');
    active.query();
    active.next();
    gs.print("Active Incidents: " + active.getAggregate('COUNT'));

    // Resolved incidents
    var resolved = new GlideAggregate('incident');
    resolved.addQuery('state', 6); // Resolved
    resolved.addAggregate('COUNT');
    resolved.query();
    resolved.next();
    gs.print("Resolved Incidents: " + resolved.getAggregate('COUNT'));

    gs.print("=== End of Report ===");
})();
