/**
 * Function to find duplicate records in any table based on a specified field.
 * Returns an array of values from specified output fields for records with duplicate field values.
 *
 * @param {string} tableName - Name of the table to search.
 * @param {string} fieldName - Field to check for duplicates.
 * @param {Array} outputFields - Array of field names to include in the output.
 */
function findDuplicateRecords(tableName, fieldName, outputFields) {
    var outputValues = [];

    // Count occurrences of the field and group by it (fieldName)
    var aggregateGR = new GlideAggregate(tableName);
    aggregateGR.addAggregate('COUNT', fieldName);
    aggregateGR.groupBy(fieldName);
    aggregateGR.addHaving('COUNT', '>', 1); // Corrected HTML entity
    aggregateGR.query();

    // Loop through each group with duplicate values
    while (aggregateGR.next()) {
        var duplicateValue = aggregateGR.getValue(fieldName);
        var recordGR = new GlideRecord(tableName);

        // Query for records with the duplicate value
        recordGR.addQuery(fieldName, duplicateValue);
        recordGR.addActiveQuery(); // Standard active filter
        recordGR.query();

        // Collect and log duplicate records
        while (recordGR.next()) {
            var outputEntry = {};
            for (var i = 0; i < outputFields.length; i++) {
                var field = outputFields[i];
                outputEntry[field] = recordGR.getValue(field);
            }
            outputValues.push(outputEntry);

            //optional: log per duplicate record
            gs.info('--> Duplicate record: ' + JSON.stringify(outputEntry));
        }
    }

    // Log the array of output values
    gs.info("Duplicate records: " + JSON.stringify(outputValues));

    return outputValues;
}

/**
 * === USAGE ===
 * Customize the table, field to check for duplicate values, and output fields below to run the duplicate check.
 */
findDuplicateRecords("kb_knowledge", "short_description", ["number", "sys_id", "short_description"]);
