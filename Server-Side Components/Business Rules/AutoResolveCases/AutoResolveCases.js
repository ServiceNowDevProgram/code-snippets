// Auto Close Incidents after 7 days in Resolved state
(function() {
    var gr = new GlideRecord('incident');
    gr.addQuery('state', '6'); // 6 = Resolved
    gr.addQuery('resolved_at', '<=', gs.daysAgoStart(7));
    gr.query();

    while (gr.next()) {
        gr.state = 7; // 7 = Closed
        gr.close_notes = 'Automatically closed after 7 days of resolution.';
        gr.update();
       // gs.info('Closed Incident: ' + gr.number);
    }
})();
