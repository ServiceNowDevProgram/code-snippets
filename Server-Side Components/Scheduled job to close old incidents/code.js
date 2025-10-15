var gr = new GlideRecord('incident');
gr.addQuery('state', '6'); // Resolved
gr.addQuery('resolved_at', '<=', gs.daysAgoStart(10));
gr.query();
while (gr.next()) {
    gr.state = 7; // Closed
    gr.close_notes = "Auto-closed after 10 days.";
    gr.update();
}
