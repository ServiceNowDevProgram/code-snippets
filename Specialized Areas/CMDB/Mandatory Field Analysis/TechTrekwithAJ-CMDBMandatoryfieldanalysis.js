(function() {
    // Define the CMDB table you want to analyze
    var cmdbTableName = 'cmdb_ci_computer'; // Replace with your desired CMDB class name
    var mandatoryFields = ['name', 'sys_class_name', 'location', 'install_status']; // Replace with your mandatory fields
    var missingFieldsCount = 0;

    // GlideRecord to query the specified CMDB table
    var gr = new GlideRecord(cmdbTableName);
    gr.query();

    // Iterate through all records in the specified CMDB table
    while (gr.next()) {
        var missingFields = [];

        // Check each mandatory field for a value
        mandatoryFields.forEach(function(field) {
            if (!gr.getValue(field)) {
                missingFields.push(field);
            }
        });

        // Log the record if any mandatory fields are missing
        if (missingFields.length > 0) {
            gs.info('Record missing mandatory fields: ' + gr.sys_id + ' (' + gr.name + '). Missing fields: ' + missingFields.join(', '));
            missingFieldsCount++;
        }
    }

    // Log the total number of records missing mandatory fields
    gs.info('Total records missing mandatory fields: ' + missingFieldsCount);
})();
