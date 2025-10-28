(function() {
    var gr = new GlideRecord('incident');
    gr.addQuery('active', true);
    gr.orderByDesc('opened_at');
    gr.setLimit(1); // Example: take the latest active incident
    gr.query();

    if (gr.next()) {
        // GlideDateTime object from UTC field
        var utcDateTime = gr.opened_at;

        // Convert to user's local time zone
        var localTime = new GlideDateTime(utcDateTime);
        var displayValue = localTime.getDisplayValue(); // Returns local time in user's timezone

        gs.info('UTC Time: ' + utcDateTime);
        gs.info('Local Time: ' + displayValue);
    } else {
        gs.info('No active incidents found.');
    }
})();
