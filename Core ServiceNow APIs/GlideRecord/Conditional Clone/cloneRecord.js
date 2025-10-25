/**
 * Clone a record in a ServiceNow table and optionally override specific fields.
 * 
 * @param {string} table - Name of the table
 * @param {string} sys_id - sys_id of the record to clone
 * @param {object} fieldOverrides - Key-value pairs of fields to modify in the cloned record
 * @returns {string|null} - sys_id of the new record or null if cloning fails
 */
function cloneRecord(table, sys_id, fieldOverrides) {
    if (!table || !sys_id) {
        gs.error('Table name and sys_id are required.');
        return null;
    }

    var gr = new GlideRecord(table);
    if (!gr.get(sys_id)) {
        gs.error('Record not found with sys_id: ' + sys_id);
        return null;
    }

    var newGr = new GlideRecord(table);
    gr.getFields().forEach(function(field) {
        var name = field.getName();
        // Do not copy sys_id or system fields
        if (name !== 'sys_id' && !field.getED().isVirtual()) {
            newGr.setValue(name, gr.getValue(name));
        }
    });

    // Apply field overrides
    if (fieldOverrides && typeof fieldOverrides === 'object') {
        for (var key in fieldOverrides) {
            newGr.setValue(key, fieldOverrides[key]);
        }
    }

    var newSysId = newGr.insert();
    if (newSysId) {
        gs.info('Record cloned successfully. New sys_id: ' + newSysId);
        return newSysId;
    } else {
        gs.error('Failed to clone record.');
        return null;
    }
}
