// Scheduled Job: Close Incidents that are older than 30 days

var gr = new GlideRecord('incident');
gr.addQuery('state', '!=', '7'); // Not Closed
gr.addQuery('sys_created_on', '<=', gs.daysAgo(30));
gr.query();

while (gr.next()) {
    gr.state = '7'; // Set to Closed
    gr.close_notes = 'Automatically closed after 30 days.';
    gr.update();
}
