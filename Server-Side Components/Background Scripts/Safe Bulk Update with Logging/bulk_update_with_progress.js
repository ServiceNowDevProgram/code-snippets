// Background Script: Safe Bulk Record Update with Progress Tracking
// Purpose: Update multiple records efficiently using updateMultiple()

var TABLE = 'incident'; // Change to your table
var FILTER = "priority=1"; // Add your filter conditions
var FIELD_TO_UPDATE = 'state'; // Field to update
var NEW_VALUE = '1'; // Value to set

var successCount = 0;
var errorCount = 0;

gs.info('[Bulk Update Started] Table: ' + TABLE + ' | Filter: ' + FILTER, 'BulkUpdate');

try {
    var gr = new GlideRecord(TABLE);
    gr.addEncodedQuery(FILTER);
    gr.query();
    
    // Collect all record IDs first (single query)
    var recordIds = [];
    while (gr.next()) {
        recordIds.push(gr.getUniqueValue());
    }
    
    // Update all records at once using updateMultiple
    if (recordIds.length > 0) {
        var updateGr = new GlideRecord(TABLE);
        updateGr.addEncodedQuery(FILTER);
        updateGr.setValue(FIELD_TO_UPDATE, NEW_VALUE);
        updateGr.updateMultiple();
        
        successCount = recordIds.length;
        gs.info('[Bulk Update Complete] Total Updated: ' + successCount, 'BulkUpdate');
    } else {
        gs.info('[Bulk Update] No records matched the filter criteria', 'BulkUpdate');
    }
    
} catch (e) {
    gs.error('[Bulk Update Error] ' + e.toString(), 'BulkUpdate');
}
