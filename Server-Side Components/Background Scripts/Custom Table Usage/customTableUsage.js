/* 
 * This script is not to be used to determine subscription and license usage.  
 * It is simply to determine how widespread the use of a custom table is in your instance to assist with tidying up unused tables.
 */

const USAGE_COUNT_CONFIG = [
    { "table": "sys_dictionary", "field": "reference", "title": "Dictionary" },
    { "table": "item_option_new", "field": "reference", "title": "Variables" },
    { "table": "sys_script", "field": "collection", "title": "Business Rules" },
    { "table": "sys_script_client", "field": "table", "title": "Client Scripts" },
    { "table": "sys_dictionary", "field": "name", "title": "Dictionary Entries" },
    { "table": "sys_dictionary_override", "field": "name", "title": "Dictionary Overrides" },
    // { "table": "sysevent_email_action", "field": "collection ", "title": "Notifications", "query": "" },
    { "table": "sys_ui_action", "field": "table", "title": "UI Actions" },
    { "table": "sys_security_acl", "field": "name", "title": "ACL", "query": "STARTSWITH" },
    { "table": "sys_ui_policy", "field": "table", "title": "UI Policies", },
    { "table": "sys_data_policy2", "field": "model_table", "title": "Data Policy" },
    { "table": "sys_ui_style", "field": "name", "title": "Styles" },
    { "table": "sysrule_view", "field": "table", "title": "View Rules" },
    { "table": "wf_workflow", "field": "table", "title": "Workflows" },
    { "table": "sys_hub_flow", "field": "sys_id", "title": "Flows", "query": "", "query_field": "sys_id" },
    { "table": "sys_script_include", "field": "script", "title": "Script Include", 'query': 'CONTAINS'}
];

// get list of fields to query from the table
// grab any fields which are listed as query_fields in the usage config, and add name and label.
var selectFields = USAGE_COUNT_CONFIG.map(function (_obj) {
    return _obj.query_field;
}).filter(Boolean);

selectFields.push('name');
selectFields.push('label');

var gqTables = new global.GlideQuery('sys_db_object')
    .where('name', 'STARTSWITH', 'u_')
    // don't want m2m tables
    .where('name', 'NOT LIKE', 'm2m')
    // don't want tables extended from Import Set Row or Query Builder Results
    // apologies for the hard-coded sys_ids, they'll never change, right?
    .where('super_class', 'NOT IN', ['88d993c3b4232110320f8dc279c8042b', '897b97c7b4632110320f8dc279c80489'])
    .select(selectFields)
    .map(function (_table) {
        var references = {};
        _table.references = references;

        USAGE_COUNT_CONFIG.forEach(function (_usageConfig) {
            var query_type = _usageConfig['query'] ? _usageConfig['query'] : "=";
            var query_field = _usageConfig['query_field'] ? _usageConfig['query_field'] : 'name';

            var gqUsageCount = new global.GlideQuery(_usageConfig.table)
                .where(_usageConfig.field, query_type, _table[query_field])
                .count();

            references[_usageConfig.title] = gqUsageCount;
        })
        delete _table["sys_id"]; // get rid of the sys_id field

        return _table;
    })
    .reduce(function (arr, e) { arr.push(e); return arr; }, []);

gs.info(JSON.stringify(gqTables, '', 3))



