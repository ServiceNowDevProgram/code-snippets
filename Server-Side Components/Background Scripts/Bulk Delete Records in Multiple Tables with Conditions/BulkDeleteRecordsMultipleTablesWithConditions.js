

/**
 * Deletes records from multiple tables based on provided encoded queries.
 *
 * @param {Object} target - An object where each key is the name of a table and each value is an encoded query string.
 *                          The function will delete all records matching the encoded query for each specified table.
 *
 * Example usage:
 * bulkDelete({
 *     'incident': 'priority=1^state=2',
 *     'change_request': 'state=3^risk=high'
 * });
 * 
 * This deletes all records in the 'incident' table where the priority is 1 and the state is 2,
 * and all records in the 'change_request' table where the state is 3 and risk is 'high'.
 */
function bulkDelete(target) {

    for (var table in target) {
        if (target.hasOwnProperty(table)) {
            var getRecord = new GlideRecord(table);
            getRecord.addEncodedQuery(target[table]);
            getRecord.query();
            while (getRecord.next()) {
                
                getRecord.deleteRecord();
            }
        }
    }
}



