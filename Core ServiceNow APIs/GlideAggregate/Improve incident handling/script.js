// Create a GlideAggregate instance for the Incident table
var inc = new GlideAggregate('incident');

// Filter for resolved incidents only
inc.addQuery('state', 6); 

// Add aggregations
inc.addAggregate('COUNT');                    // Total number of incidents
inc.addAggregate('AVG', 'calendar_duration'); // Average resolution time in hours
inc.addAggregate('COUNT', 'assignment_group'); // Count of incidents per assignment group
inc.groupBy('assignment_group'); // Group by assignment group to get the count per group
inc.query();

var totalIncidents = 0;
var averageResolution = 0;
var results = [];

while (inc.next()) {
    totalIncidents = inc.getAggregate('COUNT');
    averageResolution = inc.getAggregate('AVG', 'calendar_duration');

    // Get assignment group and incident count per group
    var groupSysId = inc.assignment_group.toString();
    var groupIncidentCount = inc.getAggregate('COUNT', 'assignment_group');

    results.push({
        groupSysId: groupSysId,
        groupIncidentCount: groupIncidentCount
    });
}

// Display results in logs
gs.info("Total Resolved Incidents are: " + totalIncidents);
gs.info("Average Resolution Time (hours) is: " + averageResolution);

results.forEach(function(result) {
    gs.info("Assignment Group: " + result.groupSysId + " | Incident Count: " + result.groupIncidentCount);
});
