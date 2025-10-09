/**
 * Clears or resets all editable fields on a form, except those explicitly excluded.
 * Compatible with Classic UI and Service Portal/Mobile.
 * Intended for use in onChange client scripts.
 *
 * @function clearFields
 * @param {Array} dontClearFieldsArray - Array of field names to exclude from clearing.
 * @returns {Array} - Array of field names that were cleared.
 *
 * @example
 * // Clears all fields except 'short_description' and 'priority'
 * clearFields(['short_description', 'priority']);
 */
function clearFields(dontClearFieldsArray) {
    // Ensure the exclusion list is defined and is an array
    dontClearFieldsArray = Array.isArray(dontClearFieldsArray) ? dontClearFieldsArray : [];

    // Helper function to check if a field should be cleared
    function shouldClear(fieldName) {
        return dontClearFieldsArray.indexOf(fieldName) === -1;
    }

    var clearedFields = [];

    try {
        // Classic UI: use g_form.nameMap to get all fields
        var allFields = g_form.nameMap;
        allFields.forEach(function(field) {
            var fieldName = field.prettyName;
            if (shouldClear(fieldName)) {
                g_form.clearValue(fieldName);
                clearedFields.push(fieldName);
            }
        });
    } catch (e) {
        // Service Portal or Mobile: use getEditableFields()
        var editableFields = g_form.getEditableFields();
        editableFields.forEach(function(fieldName) {
            if (shouldClear(fieldName)) {
                g_form.clearValue(fieldName);
                clearedFields.push(fieldName);
            }
        });
    }

    return clearedFields;
}
