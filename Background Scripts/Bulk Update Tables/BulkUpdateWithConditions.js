

/**
 * Performs a bulk update on a specified table, applying the given data to all records that match the query.
 *
 * @param {string} table - The name of the table where the bulk update is to be performed.
 * @param {string} query - The encoded query string that filters which records to update.
 * @param {Object} data - An object representing the field-value pairs to update. 
 *                        Each key is a field name, and the value is the new value for that field.
 *
 * Example usage:
 * bulkUpdate('incident', 'priority=1^state=2', { priority: 2, state: 3 });
 * 
 * This updates all incidents where priority is 1 and state is 2, setting priority to 2 and state to 3.
 */
function bulkUpdate(table, query, data) {

    var getRecord = new GlideRecord(table);
    getRecord.addEncodedQuery(query);
    getRecord.query();
    while (getRecord.next()) {
        for (var field in data) {
            if (data.hasOwnProperty(field)) {
				getRecord.setValue(field, data[field]);
            }
        }
		getRecord.update();
    }
}



