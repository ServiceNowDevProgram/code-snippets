// Background Script: Safe Bulk Record Update with Progress Tracking
// Purpose: Update multiple records safely with batch processing and error handling

var TABLE = 'incident'; // Change to your table
var FILTER = "priority=1"; // Add your filter conditions
var BATCH_SIZE = 100;
var FIELD_TO_UPDATE = 'state'; // Field to update
var NEW_VALUE = '1'; // Value to set

var successCount = 0;
var errorCount = 0;
var totalProcessed = 0;

gs.log('[Bulk Update Started] Table: ' + TABLE + ' | Filter: ' + FILTER, 'BulkUpdate');

try {
    var gr = new GlideRecord(TABLE);
    gr.addEncodedQuery(FILTER);
    gr.query();
    
    var recordsToProcess = [];
    while (gr.next()) {
        recordsToProcess.push(gr.getUniqueValue());
        
        // Process in batches to prevent timeout
        if (recordsToProcess.length === BATCH_SIZE) {
            processBatch(recordsToProcess);
            recordsToProcess = [];
        }
    }
    
    // Process remaining records
    if (recordsToProcess.length > 0) {
        processBatch(recordsToProcess);
    }
    
    gs.log('[Bulk Update Complete] Total: ' + totalProcessed + ' | Success: ' + successCount + ' | Errors: ' + errorCount, 'BulkUpdate');
    
} catch (e) {
    gs.error('[Bulk Update Error] ' + e.toString(), 'BulkUpdate');
}

function processBatch(recordIds) {
    for (var i = 0; i < recordIds.length; i++) {
        try {
            var record = new GlideRecord(TABLE);
            record.get(recordIds[i]);
            record.setValue(FIELD_TO_UPDATE, NEW_VALUE);
            record.update();
            successCount++;
        } catch (error) {
            errorCount++;
            gs.log('[Failed Record] ' + recordIds[i] + ': ' + error.toString(), 'BulkUpdate');
        }
        totalProcessed++;
    }
    
    // Log progress
    gs.log('[Progress] Updated ' + totalProcessed + ' records | Success: ' + successCount + ' | Errors: ' + errorCount, 'BulkUpdate');
}
