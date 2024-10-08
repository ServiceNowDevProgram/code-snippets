// Scheduled Job: Archive Closed Incidents
// Run: Weekly

(function execute() {
    var gr = new GlideRecord('incident');
    gr.addQuery('state', '7'); // Closed state
    gr.addQuery('sys_created_on', '<=', GlideDateTime.now().addDays(-90)); // Older than 90 days
    gr.query();

    while (gr.next()) {
        var archiveGr = new GlideRecord('incident_archive'); // Ensure you have an archive table
        archiveGr.initialize();
        archiveGr.copy(gr); // Copy fields from the original incident
        archiveGr.insert(); // Insert into the archive table
        gr.deleteRecord(); // Delete from original table
        gs.info('Archived Incident ' + gr.number);
    }
})();
