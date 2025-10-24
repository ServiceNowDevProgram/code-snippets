/**
 *	Finds and reports records that have duplicate values across a combination of specified fields instead of a single field
 *	Useful for finding for example duplicate items where unique key is not just 1 field
 */

// --- UPDATE ONLY THE VALUES BELOW ---
var tableName = 'cmdb_model'; // ADD: The table you want to check for duplicates.
var fieldNames = ['name', 'model_number', 'manufacturer']; // ADD: An array of fields that create the unique combination.

// --- DO NOT EDIT BELOW THIS LINE ---
findDuplicateCombinations(tableName, fieldNames);

function findDuplicateCombinations(tableName, fieldNames) {
    /**************************************/
    /*** Basic Error Handling         ***/
    /**************************************/

    // Check if the table exists
    if (!gs.tableExists(tableName)) {
        gs.print('Error: Table "' + tableName + '" does not exist.');
        return;
    }

    // Check if fieldNames is a valid, non-empty array
    if (!Array.isArray(fieldNames) || fieldNames.length === 0) {
        gs.print('Error: The "fieldNames" variable must be an array with at least one field.');
        return;
    }

    // Check if all specified fields exist on the table
    var gr = new GlideRecord(tableName);
    gr.initialize();
    for (var i = 0; i < fieldNames.length; i++) {
        var currentField = fieldNames[i];
        if (!gr.isValidField(currentField)) {
            gs.print('Error: The field "' + currentField + '" does not exist on the "' + tableName + '" table.');
            return;
        }
    }

    /***************************************/
    /*** Find Duplicate Combinations   ***/
    /***************************************/
    var duplicateJson = {}; // Stores the duplicate records and their counts
    var duplicateGroupCount = 0; // Counts the number of groups of duplicates

    var duplicateAggregate = new GlideAggregate(tableName);
    duplicateAggregate.addAggregate('COUNT');

    // Loop through the array to group by each field, creating the combination
    for (var j = 0; j < fieldNames.length; j++) {
        var field = fieldNames[j];
        duplicateAggregate.groupBy(field);
        duplicateAggregate.addNotNullQuery(field); // Ignore records where any part of the combination is empty
    }

    duplicateAggregate.addHaving('COUNT', '>', 1); // More than 1 means it is a duplicate combination
    duplicateAggregate.query();

    while (duplicateAggregate.next()) {
        duplicateGroupCount++;
        var combinationDisplay = [];
        var queryParams = [];

        for (var k = 0; k < fieldNames.length; k++) {
            var fieldName = fieldNames[k];
            var fieldValue = duplicateAggregate.getDisplayValue(fieldName) || duplicateAggregate.getValue(fieldName);
            var actualValue = duplicateAggregate.getValue(fieldName);
            combinationDisplay.push(fieldName + ': "' + fieldValue + '"');
            queryParams.push({
                field: fieldName,
                value: actualValue
            });
        }

        var displayKey = combinationDisplay.join(', ');
        var countInGroup = duplicateAggregate.getAggregate('COUNT');
        duplicateJson[displayKey] = {
            count: countInGroup,
            queryParams: queryParams
        };
    }

    /***************************************************/
    /*** Print the Results & Fetch sys_id's          ***/
    /***************************************************/

    var fieldCombinationString = '"' + fieldNames.join('", "') + '"';

    if (Object.keys(duplicateJson).length === 0) {
        gs.print('No duplicates found for the field combination [' + fieldCombinationString + '] on table "' + tableName + '".');
        return;
    }

    gs.print('');
    gs.print('======================================================');
    gs.print('DUPLICATE COMBINATIONS REPORT');
    gs.print('------------------------------------------------------');
    gs.print('Table: ' + tableName);
    gs.print('Found ' + duplicateGroupCount + ' groups of duplicate records.');
    gs.print('======================================================\n');

    var groupNumber = 1;
    for (var key in duplicateJson) {
        var groupData = duplicateJson[key];

        gs.print('Group ' + groupNumber + ':');
        gs.print('  - Occurrences: ' + groupData.count);
        gs.print('  - Combination:');

        var fields = key.split(', ');
        for (var i = 0; i < fields.length; i++) {
            gs.print('    - ' + fields[i]);
        }

        gs.print("  - Duplicate sys_id's:");

        // Perform the second query to get the sys_id's for this specific group
        var rec = new GlideRecord(tableName);
        for (var q = 0; q < groupData.queryParams.length; q++) {
            var query = groupData.queryParams[q];
            rec.addQuery(query.field, query.value);
        }
        rec.query();

        while (rec.next()) {
            gs.print('    - ' + rec.getUniqueValue());
        }
        gs.print('');
        groupNumber++;
    }
}
