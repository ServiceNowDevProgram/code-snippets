/**
 * Compare two GlideRecord objects field by field and log differences.
 *
 * @param {GlideRecord} grOld - Original record before changes
 * @param {GlideRecord} grNew - Updated record to compare against
 */
function fieldLevelAudit(grOld, grNew) {
    if (!grOld || !grNew) {
        gs.error('Both old and new GlideRecord objects are required.');
        return;
    }

    var fields = grOld.getFields();
    fields.forEach(function(f) {
        var name = f.getName();
        var oldValue = grOld.getValue(name);
        var newValue = grNew.getValue(name);

        if (oldValue != newValue) {
            gs.info('Field changed: ' + name + 
                    ' | Old: ' + oldValue + 
                    ' | New: ' + newValue);
        }
    });
}
