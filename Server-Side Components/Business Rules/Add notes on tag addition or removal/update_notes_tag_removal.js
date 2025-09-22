@ -0,0 +1,37 @@
/**********************BR COnfig Start***************************/
/*
Table: label_entry
When: before
order: 100
delete: true
Filter: labelISNOTEMPTY^label.nameISNOTEMPTY^EQ
*/
/**********************BR COnfig End***************************/
(function executeRule(current, previous /*null when async*/ ) {
    // Check if logging for tag removals is enabled
    if (gs.getProperty('custom.tag_entries.log_removal').toString() == "true") {
        var current_table = current.getValue('table'); // Retrieve the name of the current table
        var allowed_tables = gs.getProperty('custom.tag_entries.tables'); // Get the list of allowed tables from properties
        allowed_tables = allowed_tables.split(','); // Split the string into an array

        // Verify if the current table is in the allowed list
        if (allowed_tables.indexOf(current_table) > -1) {
            var gr_task = new GlideRecord(current_table); // Create a GlideRecord object for the current table
            try {
                // Query the record using sys_id stored in table_key
                gr_task.addQuery("sys_id", current.table_key.getValue());
                gr_task.query(); // Execute the query

                // If the record is found, update work_notes if the field is valid
                if (gr_task.next()) {
                    if (gr_task.isValidField('work_notes')) {
                        gr_task.work_notes = "Tag removed: " + current.getDisplayValue('label'); // Append removal info to work notes
                        gr_task.update(); // Save the changes made to work notes
                    }
                }
            } catch (e) {
                // Log any exceptions encountered during execution
                gs.log("Exception occurred in the business rule Updating record when tagged" + e.message);
            }
        }
    }
})(current, previous);
