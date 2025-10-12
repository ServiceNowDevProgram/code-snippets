/**
 * Compare two records in a ServiceNow table field-by-field.
 * Logs all field differences between the two records.
 *
 * Usage:
 * compareRecords('incident', 'sys_id_1_here', 'sys_id_2_here');
 */

function compareRecords(table, sys_id1, sys_id2) {
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
        var val1 = rec1.getValue(fieldName);
        var val2 = rec2.getValue(fieldName);

        if (val1 != val2) {
            gs.info(fieldName + ': "' + val1 + '" vs "' + val2 + '"');
        }
    }

    gs.info('Comparison complete.');
}

// Example call
compareRecords('incident', 'sys_id_1_here', 'sys_id_2_here');
