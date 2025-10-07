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

        for (var k = 0; k < fieldNames.length; k++) {
            var fieldName = fieldNames[k];
            var fieldValue = duplicateAggregate.getDisplayValue(fieldName) || duplicateAggregate.getValue(fieldName);
            combinationDisplay.push(fieldName + ': "' + fieldValue + '"');
        }

        var displayKey = combinationDisplay.join(', ');
        var countInGroup = duplicateAggregate.getAggregate('COUNT');
        duplicateJson[displayKey] = countInGroup;
    }

    /***************************************/
    /*** Print the Results             ***/
    /***************************************/

    // No duplicates found
    var fieldCombinationString = '"' + fieldNames.join('", "') + '"';
    if (Object.keys(duplicateJson).length === 0) {
        gs.print('No duplicates found for the field combination [' + fieldCombinationString + '] on table "' + tableName + '".');
        return;
    }

    // Duplicates were found
    gs.print("Found " + duplicateGroupCount + " groups of duplicates based on the combination [" + fieldCombinationString + "]:");

    for (var key in duplicateJson) {
        gs.print('Combination {' + key + '} has ' + duplicateJson[key] + ' occurrences.');
    }
}
