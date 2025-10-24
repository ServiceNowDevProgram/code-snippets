(function() {
    var days = 30; // Change this to your required number of days

    // Calculate the date X days ago
    var cutoffDate = new GlideDateTime();
    cutoffDate.addDaysUTC(-days);

    // Query incidents opened before the cutoff date
    var gr = new GlideRecord('incident');
    gr.addQuery('opened_at', '<', cutoffDate);
    gr.query();

    gs.info('Incidents opened more than ' + days + ' days ago:');

    while (gr.next()) {
        gs.info('Incident Number: ' + gr.number + ', Opened At: ' + gr.opened_at.getDisplayValue());
    }
})();
