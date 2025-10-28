var gr = new GlideRecord('incident');
gr.addQuery('state', 7); // Closed
gr.addQuery('active', false);
gr.addQuery('closed_at', '<=', gs.daysAgo(150));
gr.query();
while (gr.next()) {
    var ar = new GlideRecord('ar_incident'); //ar_incident is the new table for storing archive data
    ar.initialize();
    ar.short_description = gr.short_description;
    ar.description = gr.description;
    // Copy other necessary fields
    ar.insert();
    gr.deleteRecord(); // deleting from incident table if record in inserted in the archived table
}
