/**
 * Creates multiple records in specified tables based on provided data.
 *
 * @param {Object} target - An object where each key is the name of a table,
 *                          and each value is an array of objects representing
 *                          the records to be created. Each object in the array
 *                          should contain field-value pairs for the respective table.
 *
 * Example usage:
 * bulkCreateRecords({
 *     'incident': [
 *         { short_description: 'Network issue', caller_id: '681ccaf9c0a8016401c5a33be04be441', priority: 2 },
 *         { short_description: 'Email outage', caller_id: '681ccaf9c0a8016401c5a33be04be442', priority: 1 }
 *     ],
 *     'change_request': [
 *         { short_description: 'Server upgrade', assigned_to: '681ccaf9c0a8016401c5a33be04be443', state: 'new' }
 *     ]
 * });
 *
 * This creates two new records in the 'incident' table and one new record in the
 * 'change_request' table with the specified field values.
 */

function bulkCreateRecords(target) {
    for (var table in target) {
        if (target.hasOwnProperty(table)) {
			var recordData = target[table];
            recordData.forEach(function(data) {
                var gr = new GlideRecord(table);
                gr.initialize();
                for (var field in data) {
                    if (data.hasOwnProperty(field)) {
                        gr.setValue(field, data[field]);
                    }
                }
                gr.insert();
            });
        }
    }
}



