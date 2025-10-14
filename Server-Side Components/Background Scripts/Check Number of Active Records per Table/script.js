// Script: Check Number of Active Records per Table
// Author: Bhavya
// Use: To count active records in multiple tables

(function() {
    // List of tables you want to check
    var tables = ['incident', 'change_request', 'problem', 'task'];

    gs.print('Active Record Count per Table');

    for (var i = 0; i < tables.length; i++) {
        var tableName = tables[i];
        var gr = new GlideRecord(tableName);

        // Filter for active records
        gr.addQuery('active', true);
        gr.query();

        var count = gr.getRowCount();
        gs.print(tableName + " - Active Records: " + count);
    }
})();
