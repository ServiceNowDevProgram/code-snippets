// Duplicate Record Finder
// Usage: Run in Scripts - Background or as a Fix Script
// Update the variables 'tableName' and 'fieldName' below before running

var tableName = 'incident';      // Set your target table here
var fieldName = 'short_description';  // Set the target field to check duplicates

findDuplicates(tableName, fieldName);

function findDuplicates(tableName, fieldName) {
    // Validate that the table exists
    if (!gs.tableExists(tableName)) {
        gs.info('Table "' + tableName + '" does not exist.');
        return;
    }

    // Validate that the field exists on the table
    var gr = new GlideRecord(tableName);
    gr.initialize();
    if (!gr.isValidField(fieldName)) {
        gs.info('Field "' + fieldName + '" does not exist on table "' + tableName + '".');
        return;
    }

    // Prepare GlideAggregate to find duplicates
    var ga = new GlideAggregate(tableName);
    ga.addAggregate('COUNT', fieldName);
    ga.groupBy(fieldName);
    ga.addHaving('COUNT', '>', 1);        // More than 1 means duplicates exist
    ga.addNotNullQuery(fieldName);        // Ignore null or empty values
    ga.query();

    var duplicateCount = 0;
    var duplicates = {};

    while (ga.next()) {
        var value = ga.getValue(fieldName);
        var count = parseInt(ga.getAggregate('COUNT', fieldName), 10);
        duplicates[value] = count;
        duplicateCount++;
    }

    if (duplicateCount === 0) {
        gs.info('No duplicates found for field "' + fieldName + '" on table "' + tableName + '".');
        return;
    }

    gs.info('Found ' + duplicateCount + ' groups of duplicates for field "' + fieldName + '" on table "' + tableName + '":');
    for (var val in duplicates) {
        gs.info('Value "' + val + '" occurs ' + duplicates[val] + ' times.');
    }
}
