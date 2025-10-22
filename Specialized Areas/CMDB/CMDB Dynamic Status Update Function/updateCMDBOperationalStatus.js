function updateOperationalStatus(tableName, encodedQuery, nonOperDays, deletionDays) {
    // Get the current date and time
    var todayDate = new GlideDateTime();
    gs.info("Today's date: " + todayDate);

    // Validate if the necessary fields exist in the table (last_discovered and operational_status)
    var grCheck = new GlideRecord(tableName);
    if (!grCheck.isValidField('last_discovered') || !grCheck.isValidField('operational_status')) {
        gs.error("Table " + tableName + " does not have the required fields (last_discovered, operational_status).");
        return;
    }

    // Query the specified CMDB table with the provided encoded query
    var gr = new GlideRecord(tableName);
    gr.addEncodedQuery(encodedQuery);
    gr.query();

    while (gr.next()) {
        var recentDiscovery = new GlideDateTime(gr.last_discovered);
        gs.info("Last discovered date: " + recentDiscovery);

        // Calculate the difference between today and last_discovered
        var differenceInMs = todayDate.getNumericValue() - recentDiscovery.getNumericValue();
        var differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        gs.info("Difference in days: " + differenceInDays);

        // If last_discovered is more than nonOperDays old, mark as Non-operational
        if (differenceInDays > nonOperDays) {
            gr.operational_status = '2'; // 2 is typically used for 'Non-operational' or similar status
            gr.update(); // Update the record to mark it as non-operational
            gs.info("Record " + gr.sys_id + " marked as Non-operational.");
        }

        // If last_discovered is more than deletionDays old, delete the record
        if (differenceInDays > deletionDays) {
            gs.info("Record " + gr.sys_id + " is more than " + deletionDays + " days old and will be deleted.");
            gr.deleteRecord(); // Retire (delete) the record
        }
    }
}


// Example: Update records in 'cmdb_ci_appl' where discovery_source is 'ServiceNow'
// Mark as Non-operational after 14 days, delete after 30 days
updateOperationalStatus('cmdb_ci_appl', 'discovery_source=ServiceNow^sys_id=5f8af237c0a8010e01a932999468b83a', 14, 30);
