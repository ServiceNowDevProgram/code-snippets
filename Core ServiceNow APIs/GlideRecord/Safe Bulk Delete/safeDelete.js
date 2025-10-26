/**
 * Safely delete multiple records from a ServiceNow table.
 * Logs all affected records before deletion to prevent accidental data loss.
 * Uncomment gr.deleteRecord() to perform the actual deletion.
 *
 * @param {string} table - The table name
 * @param {string} encodedQuery - GlideRecord encoded query for filtering records
 */
function safeDelete(table, encodedQuery) {
    if (!table || !encodedQuery) {
        gs.error('Both table name and encoded query are required.');
        return;
    }

    var gr = new GlideRecord(table);
    gr.addEncodedQuery(encodedQuery);
    gr.query();

    var count = gr.getRowCount();
    gs.info('Records matching query: ' + count);

    if (count === 0) {
        gs.info('No records found. Nothing to delete.');
        return;
    }

    while (gr.next()) {
        gs.info('Record sys_id: ' + gr.getValue('sys_id') + ' would be deleted.');
        // gr.deleteRecord(); // Uncomment this line to actually delete
    }

    gs.info('Bulk delete preview complete. Verify logs before enabling deletion.');
}
