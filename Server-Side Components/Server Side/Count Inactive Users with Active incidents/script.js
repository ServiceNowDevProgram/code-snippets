/* 
This script uses GlideAggregate to find the number of active incidents
that are assigned to users who are currently marked as inactive.
GlideAggregate is used instead of a standard GlideRecord query
because it is more efficient for performing calculations like COUNT 
directly in the database.
*/
var ga = new GlideAggregate('incident');

// Query for active incidents.
ga.addQuery('active', true);

// Use dot-walking to query for incidents assigned to inactive users.
ga.addQuery('assigned_to.active', false);

// Add an aggregate function to count the incidents, grouped by the assigned user.
ga.addAggregate('COUNT', 'assigned_to');

// Execute the query.
ga.query();

// Process the results of the aggregate query.
while (ga.next()) {
    // Get the display name of the inactive user from the current record.
    var inactiveUser = ga.assigned_to.getDisplayValue();
    
    // Get the count of active incidents for this specific user.
    var incidentCount = ga.getAggregate('COUNT', 'assigned_to');
    
    // Log the result to the system logs.
    gs.info("Inactive user " + inactiveUser + " has " + incidentCount + " active incidents.");
}
