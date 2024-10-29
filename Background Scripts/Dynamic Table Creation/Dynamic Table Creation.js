(function() {
    var tableName = 'u_custom_table';
    var tableLabel = 'Custom Table';
    var tableDesc = 'Dynamically created table';
    var tableSysId = GlideTableDescriptor.createTable(tableName, tableLabel, tableDesc);

    var col1 = new GlideColumnDescriptor('u_name', tableSysId);
    col1.setLabel('Name');
    col1.setType('string');
    col1.setMaxLength(100);
    col1.create();

    var col2 = new GlideColumnDescriptor('u_description', tableSysId);
    col2.setLabel('Description');
    col2.setType('string');
    col2.setMaxLength(255);
    col2.create();

    gs.print("Table created with sys_id: " + tableSysId);
})();
