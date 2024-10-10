// Scheduled Job Script
var closedIncidentGr = new GlideRecord('incident');
closedIncidentGr.addQuery('state', 'Closed');
closedIncidentGr.addQuery('sys_created_on', '<=', gs.daysAgo(365)); // Older than 1 year
closedIncidentGr.query();

while (closedIncidentGr.next()) {
    var archiveGr = new GlideRecord('incident_archive'); // Assuming an archive table
    archiveGr.initialize();
    archiveGr.short_description = closedIncidentGr.short_description;
    archiveGr.sys_id = closedIncidentGr.sys_id;
    archiveGr.insert();
    closedIncidentGr.deleteRecord(); // Remove from active table
    gs.info('Archived closed incident: ' + closedIncidentGr.number);
}
