(function() {
    // Array of CMDB tables to count records from
    var cmdbTables = [
        'cmdb_ci',         // Configuration Items
        'cmdb_ci_service', // Services
        'cmdb_ci_database', // Databases
        'cmdb_ci_server',   // Servers
        'cmdb_ci_netgear',  // Network Gear,
        'cmdb_ci_win_server',  // windows Servers
        'cmdb_ci_linux_server',  // linux Servers
        'cmdb_ci_appl',   // Applications
        'cmdb_ci_computer',  // Computers
        'cmdb_ci_business_app',  // Business Applications
        'cmdb_ci_printer',   // Printers
        'cmdb_ci_hardware',  // Hardware
        'cmdb_ci_storage_device',  // Storage devices
        'cmdb_ci_vm_object'  // Virtual Machine Objects
       
        // we can add more CMDB tables as we needed
     
    ];
    
    // Iterate over each table and count records
    for (var i = 0; i < cmdbTables.length; i++) {
        var tableName = cmdbTables[i];
        var gr = new GlideRecord(tableName);
        gr.query();
        var count = gr.getRowCount();
        
        // Log the count for the current table
        gs.info('Table: ' + tableName + ' - Record Count: ' + count);
    }
})();
