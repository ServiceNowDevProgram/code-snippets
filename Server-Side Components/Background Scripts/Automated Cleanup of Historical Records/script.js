var gr = new GlideRecord('incident');
gr.addQuery('state', 7); // Closed incidents
gr.addQuery('closed_at', '<=', gs.daysAgo(90));
gr.query();

var deletedCount = 0;

while (gr.next()) {

    // Check for any child tasks or linked changes
    var related = new GlideRecord('task');
    related.addQuery('parent', gr.sys_id);
    related.query();
    
    if (related.next()) {
        gs.info('Skipping ' + gr.number + ' because it has linked tasks/changes.');
        continue;
    }

    // Safe to delete
    gr.deleteRecord();
    deletedCount++;
}

gs.info('Cleanup completed. Total records deleted: ' + deletedCount);
