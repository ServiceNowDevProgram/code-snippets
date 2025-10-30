/**
 * GlideRecord Error Handling Wrapper
 * Safely executes GlideRecord queries and catches runtime errors such as invalid table names or malformed queries.
 * Logs detailed error information and ensures the script continues gracefully.
 */

function safeQuery(table, queryCallback) {
    try {
        var gr = new GlideRecord(table);
        if (!gr.isValid()) {
            gs.error('Invalid table name: ' + table);
            return;
        }

        queryCallback(gr);
    } catch (e) {
        gs.error('Error executing GlideRecord query on table "' + table + '": ' + e.message);
    }
}

// Example usage:
safeQuery('incident', function (gr) {
    gr.addQuery('active', true);
    gr.query();
    while (gr.next()) {
        gs.info('Incident: ' + gr.number);
    }
});
