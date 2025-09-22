var table = '<name_of_the_table_for_schema_generation>';    // Ex: incident,cmdb_ci_server,etc.
var fields = getTableColumns(table);
var fieldGr = new GlideRecord('sys_dictionary');
fieldGr.addEncodedQuery(fields);
fieldGr.query();
var schema = {};
var data = new GlideRecord(table);
data.setLimit(1);
data.query();
if (data.next()) {
    while (fieldGr.next()) {
        var obj = {};
        var choices = GlideChoiceList.getChoiceList(table, fieldGr.element);
        var check = false;
        if (choices.getSize() > 1) {
            check = true;
        }
        obj['label'] = fieldGr.getValue('column_label');
        // if custom label is present
        var customLabel = new GlideRecord('sys_documentation');
        customLabel.addEncodedQuery('name=' + table + '^element=' + fieldGr.element.toString());
        customLabel.query();
        if (customLabel.next()) {
            obj['label'] = customLabel.label.toString();
        }
        obj['max_length'] = (fieldGr.internal_type == 'reference' || fieldGr.internal_type == 'domain_id') ? 32 : fieldGr.getValue('max_length');
        obj['choice_list'] = check;
        obj['internal_type'] = fieldGr.getValue('internal_type');
        obj['active_status'] = fieldGr.getValue('active');
        if (check == true) {
            var obj2 = {};
            for (var i = 0; i < choices.getSize(); i++) {
                obj2[choices.getChoice(i).getLabel().toString()] = choices.getChoice(i).getValue().toString();
            }
            obj['choice_list_values'] = obj2;
        }
        if (fieldGr.internal_type == 'reference' || fieldGr.internal_type == 'domain_id') {
            obj['reference_table'] = fieldGr.getValue('reference');
            obj['reference_field_max_length'] = fieldGr.getValue('max_length');
        }
        schema[fieldGr.element] = obj;
    }
}
gs.print(JSON.stringify(schema));


function getTableColumns(table) {
    // Get the ancestors of the given table using the SNC.TableEditor.getTableAncestors function
    var tableAncestors = SNC.TableEditor.getTableAncestors(table);
    // Create a new GlideRecord for the 'sys_dictionary' table
    var gr = new GlideRecord('sys_dictionary');
    // Add a query to find all records where the 'name' field is one of the ancestors of the given table
    gr.addQuery('name', 'ONE IN', tableAncestors);
    // Add a query to exclude any records where the 'element' field is NULL
    gr.addQuery('element', '!=', 'NULL');
    // Execute the query
    gr.query();
    // Create an empty array called 'sysIds'
    var sysIds = []; //Changed the variable name 'array' to a more descriptive name 'sysIds'.
    //Changed the 'new Array()' syntax to an array literal syntax '[]' for consistency and readability.
    // Loop through each record in the GlideRecord
    while (gr.next()) {
        // Add the sys_id of the current record to the 'sysIds' array as a string
        sysIds.push(gr.sys_id.toString());
    }
    // Return a string that consists of 'sys_idIN' followed by a comma-separated list of the sys_id values in the 'sysIds' array
    //Changed the return statement to explicitly concatenate the string 'sys_idIN' and the sys_id values in the 'sysIds' array using the 'join' method instead of relying on implicit type conversion.
    return 'sys_idIN' + sysIds.join(',');
}