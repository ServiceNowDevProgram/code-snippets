/**
 * Fix Script: Remove Extra Spaces from a Field
 *
 * Description:
 * This script removes leading/trailing spaces and collapses multiple
 * consecutive spaces into a single space for a specified field on a specified table.
 *
 * INSTRUCTIONS:
 * 1. Update the tableName and fieldName with the table and field you want to remove spaces from, usually fieldName will be name or short_description
 * 2. Set 'processRecords' to false for a preview, set to true to do the updates
 */

(function () {
    // Set to true to perform the update, false to just preview the changes
    var processRecords = false;

    var tableName = 'incident'; // Add your table name
    var fieldName = 'short_description'; // Add the field that might contain leading spaces

    var recordsUpdated = 0;

    if (gs.nil(tableName) || gs.nil(fieldName)) {
        gs.print('Please set the table and field name');
        return;
    }

    gs.info('Starting space removal process for table: [' + tableName + '], field: [' + fieldName + ']');
    gs.info('Run mode: ' + (processRecords ? 'UPDATE' : 'PREVIEW'));

    try {
        var gr = new GlideRecord(tableName);
        // Only query records where the target field is not empty
        gr.addNotNullQuery(fieldName);
        gr.query();

        while (gr.next()) {
            var originalValue = gr.getValue(fieldName);

            // Replace all occurrences of 2 or more spaces with a single space and trim leading/trailing whitespace
            var cleanedValue = originalValue.replace(/\s\s+/g, ' ').trim();

            // Check if the value has actually changed
            if (originalValue !== cleanedValue) {
                gs.print('Record sys_id: ' + gr.getUniqueValue() + ' (Number: ' + gr.getDisplayValue('number') + ')\n' +
                    '---> Original: "' + originalValue + '"\n' +
                    '---> Cleaned:  "' + cleanedValue + '"\n'
                );

                if (processRecords) {
                    gr.setValue(fieldName, cleanedValue);
                    gr.setWorkflow(false);
                    gr.autoSysFields(false);
                    gr.update();
                    recordsUpdated++;
                }
            }
        }

        gs.print('Space removal process finished.');
        if (processRecords) {
            gs.info(recordsUpdated + ' records were updated.');
        } else {
            gs.print('This was a PREVIEW run. No records were updated. To apply changes, set the "processRecords" variable to true.');
        }

    } catch (e) {
        gs.error('An error occurred during the space removal script: ' + e.message);
    }
})();
