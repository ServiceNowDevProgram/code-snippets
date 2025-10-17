// Auto Close Incidents after 7 days in Resolved state
(function() {
    var grInc = new GlideRecord('incident');
    grInc.addQuery('state', '6'); // 6 = Resolved
    grInc.addQuery('resolved_at', '<=', gs.daysAgoStart(7));
    grInc.query();

    while (grInc.next()) {
        grInc.state = 7; // 7 = Closed
        grInc.close_notes = 'Automatically closed after 7 days of resolution.';
        grInc.update();
      //  gs.info('Closed Incident: ' + gr.number);
    }
})();
