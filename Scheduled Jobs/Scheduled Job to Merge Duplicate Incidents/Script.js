var incidentGr = new GlideRecord('incident');
incidentGr.addQuery('active', true);
incidentGr.addQuery('short_description', 'CONTAINS', 'duplicate'); // Example query for duplicates
incidentGr.query();

while (incidentGr.next()) {
    var mergeGr = new GlideRecord('incident');
    mergeGr.addQuery('active', true);
    mergeGr.addQuery('short_description', incidentGr.short_description); // Find potential duplicates
    mergeGr.query();

    while (mergeGr.next()) {
        if (mergeGr.sys_id != incidentGr.sys_id) {
            // Merge logic (e.g., add notes, close duplicate)
            mergeGr.state = 'Closed';
            mergeGr.update();
            gs.info('Merged incident ' + mergeGr.number + ' into ' + incidentGr.number);
        }
    }
}
