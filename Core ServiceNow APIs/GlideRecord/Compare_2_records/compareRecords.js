/**
 * Compare two records in a ServiceNow table field-by-field.
 * Logs all field differences between the two records, including display values.
 * 
 * Parameters: 
 * @param {string} table - Table name
 * @param {string} sys_id1 - sys_id of first record
 * @param {string} sys_id2 - sys_id of second record
 * @param {boolean} includeSystemFields - true to compare system fields, false to skip them
 * 
 * Usage:
 * compareRecords('incident', 'sys_id_1_here', 'sys_id_2_here', true/false);
 */

function compareRecords(table, sys_id1, sys_id2, includeSystemFields) {
    var rec1 = new GlideRecord(table);
    var rec2 = new GlideRecord(table);

    if (!rec1.get(sys_id1) || !rec2.get(sys_id2)) {
        gs.error('One or both sys_ids are invalid for table: ' + table);
        return;
    }

    var fields = rec1.getFields();
    gs.info('Comparing records in table: ' + table);

    for (var i = 0; i < fields.size(); i++) {
        var field = fields.get(i);
        var fieldName = field.getName();
        
        if( !includeSystemFields && fieldName.startsWith('sys_') ) {
            continue; 
        }

        var val1 = rec1.getValue(fieldName);
        var val2 = rec2.getValue(fieldName);

        var disp1 = rec1.getDisplayValue(fieldName);
        var disp2 = rec2.getDisplayValue(fieldName);

        if (val1 != val2) {
            gs.info(
                fieldName + ': Backend -> "' + val1 + '" vs "' + val2 + '", ' +
                'Display -> "' + disp1 + '" vs "' + disp2 + '"'
            );
        }
    }

    gs.info('Comparison complete.');
}

// Example call
compareRecords('incident', 'sys_id_1_here', 'sys_id_2_here', false);
