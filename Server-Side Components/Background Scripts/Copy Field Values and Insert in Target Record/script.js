/**
 * Copies specified fields from a source record to a newly created target record,
 * validating all fields before performing the insert operation.
 *
 * @param {string} sourceTable - The name of the source table.
 * @param {string} sourceId - The sys_id of the source record.
 * @param {string} targetTable - The name of the target table.
 * @param {string[]} fields - An array of field names to copy.
 * @returns {string|null} The sys_id of the newly created target record, or null on failure.
 */
function copyFieldsValidated(sourceTable, sourceId, targetTable, fields) {
    var src = new GlideRecord(sourceTable);
    if (!src.get(sourceId)) {
        gs.error("Source record not found in " + sourceTable + " with sys_id: " + sourceId);
        return null;
    }

    var tgt = new GlideRecord(targetTable);
    tgt.initialize();
    var allFieldsAreValid = true;
    // First, validate all fields before doing any work
    fields.forEach(function(f) {
        if (!src.isValidField(f) || !tgt.isValidField(f)) {
            gs.warn("Field [" + f + "] is not valid in both " + sourceTable + " and " + targetTable + ". Aborting insert.");
            allFieldsAreValid = false;
        }
    });

    // Proceed with copying and inserting only if all fields are valid
    if (allFieldsAreValid) {
        fields.forEach(function(f) {
            tgt.setValue(f, src.getValue(f));
        });
        var newId = tgt.insert();
        if (newId) {
            gs.info("Record copied from " + sourceTable + " → " + targetTable + ". New sys_id: " + newId);
            return newId;
        } else {
            gs.error("Failed to insert new record into " + targetTable);
            return null;
        }
    } else {
        gs.error("Aborting record insert due to invalid fields.");
        return null;
    }
}
