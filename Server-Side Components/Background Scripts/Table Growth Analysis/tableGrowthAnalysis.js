// === TABLE SIZE ANALYSIS SCRIPT ===
// Log the start of the analysis
gs.info('=== TABLE SIZE ANALYSIS ===');

// Define the list of tables to analyze
var tablesToCheck = ['task', 'cmdb_ci', 'sc_cat_item'];

// Loop through each table in the list
for (var i = 0; i < tablesToCheck.length; i++) {
    var tableName = tablesToCheck[i]; // Get current table name

    // Create a GlideAggregate object to count total records in the table
    var grCount = new GlideAggregate(tableName);
    grCount.addAggregate('COUNT'); // Add COUNT aggregate
    grCount.query(); // Execute the query

    // If the query returns a result
    if (grCount.next()) {
        var recordCount = grCount.getAggregate('COUNT'); // Get total record count
        gs.info('Table: ' + tableName + ' | Record count: ' + recordCount); // Log the count

        // Optional: Analyze growth by checking records created in the last 30 days
        var grRecent = new GlideAggregate(tableName);
        grRecent.addAggregate('COUNT'); // Add COUNT aggregate
        grRecent.addQuery('sys_created_on', '>=', gs.daysAgo(30)); // Filter records created in last 30 days
        grRecent.query(); // Execute the query

        // If the query returns a result
        if (grRecent.next()) {
            var recentCount = grRecent.getAggregate('COUNT'); // Get count of recent records
            gs.info(' - Records created last 30 days: ' + recentCount); // Log the recent count
        }
    }
}
