// Set the table you want to check
var tableName = 'sys_attachment_doc'; // You can change this to any table

// Try to get the table size from sys_physical_table_stats
var tableStats = new GlideRecord('sys_physical_table_stats');
tableStats.addQuery('table_name', tableName);
tableStats.setLimit(1);
tableStats.query();

var sizeGB = null;
var recordCount = null;

if (tableStats.next()) {
    sizeGB = tableStats.getValue('table_size_in_gb');
}

// If the table size is not available, estimate based on record count
if (!sizeGB) {
    var grCount = new GlideAggregate(tableName);
    grCount.addAggregate('COUNT');
    grCount.query();

    if (grCount.next()) {
        recordCount = parseInt(grCount.getAggregate('COUNT'), 10);
        // Simple estimate: assume 1 KB per record
        sizeGB = (recordCount / (1024 * 1024)).toFixed(2);
        gs.info('Table [' + tableName + '] size not found in metadata. Estimated size: ' + sizeGB + ' GB');
    } else {
        gs.info('Table [' + tableName + '] not found or contains no records.');
    }
} else {
    gs.info('Table [' + tableName + '] size from metadata: ' + sizeGB + ' GB');
}

// Get record count properly
var grCountFinal = new GlideAggregate(tableName);
grCountFinal.addAggregate('COUNT');
grCountFinal.query();

recordCount = 0;
if (grCountFinal.next()) {
    recordCount = parseInt(grCountFinal.getAggregate('COUNT'), 10);
}

gs.info('Table [' + tableName + '] contains ' + recordCount + ' records');
