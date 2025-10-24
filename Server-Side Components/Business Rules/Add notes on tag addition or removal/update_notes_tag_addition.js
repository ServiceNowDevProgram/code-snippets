@ -0,0 +1,38 @@
/**********************BR COnfig Start***************************/
/*
Table: label_entry
When: async
order: 2000
insert: true
Filter: labelISNOTEMPTY^label.nameISNOTEMPTY^EQ
*/
/**********************BR COnfig End***************************/

(function executeRule(current, previous /*null when async*/ ) {
    // Check if logging for tag additions is enabled
    if (gs.getProperty('custom.tag_entries.log_addition').toString() == "true") {
        var current_table = current.getValue('table'); // Get the current table name
        var allowed_tables = gs.getProperty('custom.tag_entries.tables'); // Get allowed tables for addition of notes from tag entries from properties
        allowed_tables = allowed_tables.split(','); // Split into an array

        // Verify if the current table is in the allowed list
        if (allowed_tables.indexOf(current_table) > -1) {
            var gr_task = new GlideRecord(current_table); // Instantiate a GlideRecord for the current table
            try {
                // Query the record using sys_id stored in table_key
                gr_task.addQuery("sys_id", current.table_key.getValue());
                gr_task.query(); // Execute the query
                
                // If record found, update work_notes if the field is valid
                if (gr_task.next()) {
                    if (gr_task.isValidField('work_notes')) {
                        gr_task.work_notes = "Tag added: " + current.getDisplayValue('label'); // Append tag info
                        gr_task.update(); // Save changes
                    }
                }
            } catch (e) {
                // Log any exceptions encountered during execution
                gs.log("Exception occurred in the business rule Updating record when tagged" + e.message);
            }
        }
    }
})(current, previous);
