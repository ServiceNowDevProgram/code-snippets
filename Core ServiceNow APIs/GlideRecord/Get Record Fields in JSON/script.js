//# Fetch all fields of a record and return as JSON
function grFetchRecordFields(tableName, sysId) {
    var result = {};
    var gr = new GlideRecord(tableName);
    if (gr.get(sysId)) {
        var fields = gr.getFields();
        for (var i = 0; i < fields.size(); i++) {
            var fieldName = fields.get(i).getName();
            result[fieldName] = gr.getValue(fieldName);
        }
    }
    return JSON.stringify(result);
}

// Example Usage:
var recordData = grFetchRecordFields('incident', 'sys_id_value');
gs.info('Record Data: ' + recordData);
