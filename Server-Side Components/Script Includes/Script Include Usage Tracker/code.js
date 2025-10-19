

    var scriptIncludeName = 'MyScriptInclude'; // Change this to your target Script Include
    var usage = [];

    function searchUsage(table, field) {
        var gr = new GlideRecord(table);
        gr.addEncodedQuery(field + 'LIKE' + scriptIncludeName);
        gr.query();
        while (gr.next()) {
            usage.push({
                table: table,
                name: gr.name || gr.getDisplayValue(),
                sys_id: gr.getUniqueValue()
            });
        }
    }

    var tablesToSearch = [
        { table: 'sys_script', field: 'script' },
        { table: 'sys_ui_action', field: 'script' },
        { table: 'sys_script_include', field: 'script' },
        { table: 'sys_flow_context', field: 'definition' },
        { table: 'sys_trigger', field: 'script' }
    ];// can add more entries here

    tablesToSearch.forEach(function(t) {
        searchUsage(t.table, t.field);
    });

    gs.info('Usage of Script Include: ' + scriptIncludeName);
    usage.forEach(function(u) {
        gs.info('Found in table: ' + u.table + ', name: ' + u.name + ', sys_id: ' + u.sys_id);
    });

