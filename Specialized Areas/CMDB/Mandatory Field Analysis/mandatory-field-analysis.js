// sys_dictionary
// need to account for sys_dictionary_override
var out_file = '\nTable,Field name,Label,Mandatory,Updated By,Update Date,Update Name\n';
var eQuery = 'mandatory!=false^nameSTARTSWITHcmdb_ci_';
var dict = new GlideRecord('sys_dictionary');
dict.addEncodedQuery(eQuery);
dict.query();
while (dict.next()) {
    var key2find = dict.name + ',' + dict.column_label + ',' + dict.element + ',' + dict.mandatory + ',' + dict.sys_updated_by + ',' + dict.sys_updated_on + ',' + dict.sys_update_name;
    out_file += key2find +'\n'
}
gs.info(out_file);