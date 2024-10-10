// Business Rule: Calculate Resolution Time
// Trigger: After Update
// Table: incident

if (current.state == 'Closed' && current.resolved_at) {
    var resolutionTime = current.resolved_at.getGlideObject().getNumericValue() - current.sys_created_on.getGlideObject().getNumericValue();
    current.resolution_time = resolutionTime; // Store in a custom field
    current.update();
    gs.info('Resolution time calculated for incident: ' + current.number);
}
