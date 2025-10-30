/**
 * Update multiple records in a table based on an encoded query with field-level updates.
 * Logs all updated records for verification.
 *
 * @param {string} table - Name of the table
 * @param {string} encodedQuery - GlideRecord encoded query to select records
 * @param {object} fieldUpdates - Key-value pairs of fields to update
 */
function batchUpdate(table, encodedQuery, fieldUpdates) {
    if (!table || !encodedQuery || !fieldUpdates || typeof fieldUpdates !== 'object') {
        gs.error('Table, encodedQuery, and fieldUpdates (object) are required.');
        return;
    }

    var gr = new GlideRecord(table);
    gr.addEncodedQuery(encodedQuery);
    gr.query();

    var count = 0;
    while (gr.next()) {
        for (var field in fieldUpdates) {
            if (gr.isValidField(field)) {
                gr.setValue(field, fieldUpdates[field]);
            } else {
                gs.warn('Invalid field: ' + field + ' in table ' + table);
            }
        }

        gr.update();
        gs.info('Updated record: ' + gr.getValue('sys_id'));
        count++;
    }

    gs.info('Batch update completed. Total records updated: ' + count);
}
