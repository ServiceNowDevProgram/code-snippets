getJson('incident', 'rfc,caller_id'); // pass table name and field names comma separated.
function getJson(tableName, fields) {
    var jsonObj = {};
    var eQry = gs.nil(fields) ? 'name=' + tableName : 'name=' + tableName + '^elementIN' + fields; // generate JSON of enitre table if no fields are specified.
    var dict = new GlideRecord('sys_dictionary');
    dict.addEncodedQuery(eQry);
    dict.query();
    while (dict.next()) {
        jsonObj[dict.element] = '';
    }
  return JSON.stringify(jsonObj);
}
