// Update ONLY below values to find duplicates
var tableName = 'incident'; // ADD: Table you want for duplicates
var fieldName = 'short_description';	// ADD: Field that you want to check for duplicates

findDuplicates(tableName, fieldName);

function findDuplicates(tableName, fieldName) {
    /**************************************/
    /*** Basic error handling on inputs ***/
    /**************************************/

    // Check if table exists
    if (!gs.tableExists(tableName)) {
        // MODIFIED: Switched to string concatenation
        gs.info('Table "' + tableName + '" does not exist.');
        return;
    }

    // Check if field exists
    var gr = new GlideRecord(tableName);
    gr.initialize();
    if (!gr.isValidField(fieldName)) {
        gs.print('No field called "' + fieldName + '" on the "' + tableName + '" table.');
        return;
    }

    /***************************************/
    /*********** Find duplicates ***********/
    /***************************************/
    var duplicateJson = {}; // Store the duplicate records
    var duplicateGroupCount = 0; // Counts the number of groups of duplicates

    var duplicateAggregate = new GlideAggregate(tableName);
    duplicateAggregate.addAggregate('COUNT', fieldName);
    duplicateAggregate.groupBy(fieldName);
    duplicateAggregate.addHaving('COUNT', '>', 1); // More than 1 means it is a duplicate
    duplicateAggregate.addNotNullQuery(fieldName); // Ignore records where the field is empty
    duplicateAggregate.query();

    while (duplicateAggregate.next()) {
        duplicateGroupCount++;
        var fieldValue = duplicateAggregate.getValue(fieldName);
        var countInGroup = duplicateAggregate.getAggregate('COUNT', fieldName);
        duplicateJson[fieldValue] = countInGroup;
    }

    /***************************************/
    /********** Print the results **********/
    /***************************************/

    // No duplicates found
    if (Object.keys(duplicateJson).length === 0) {
        gs.print('No duplicates found for field "' + fieldName + '" on table "' + tableName + '".');
        return;
    }

    // Duplicates were found
    gs.print("Found " + duplicateGroupCount + " groups of duplicates:");
    
    for (var key in duplicateJson) {
        gs.print('Value "' + key + '" has ' + duplicateJson[key] + ' occurrences.');
    }
}

