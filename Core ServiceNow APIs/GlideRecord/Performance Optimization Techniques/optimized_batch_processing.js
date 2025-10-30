/**
 * Optimized Batch Processing with GlideRecord
 * 
 * This snippet demonstrates efficient techniques for processing large numbers of records
 * while maintaining good performance and avoiding timeout issues.
 * 
 * Use Case: Bulk updates, data migration, or mass record processing
 * Performance Benefits: Reduced memory usage, better transaction management, timeout prevention
 * 
 * @author ServiceNow Community
 * @version 1.0
 */

// Method 1: Chunked Processing with Limit
function processRecordsInChunks() {
    var tableName = 'incident';
    var chunkSize = 500; // Adjust based on your needs and system performance
    var processedCount = 0;
    var totalProcessed = 0;
    
    // Log start time for performance monitoring
    var startTime = new Date().getTime();
    gs.log('Starting batch processing at: ' + new Date());
    
    do {
        var gr = new GlideRecord(tableName);
        
        // Use indexed fields for better performance
        gr.addQuery('state', 'IN', '1,2,3'); // Open states
        gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(30)); // Last 30 days
        
        // Set limit for this chunk
        gr.setLimit(chunkSize);
        gr.orderBy('sys_created_on'); // Consistent ordering for pagination
        
        // Skip already processed records
        gr.chooseWindow(totalProcessed, totalProcessed + chunkSize);
        
        gr.query();
        
        processedCount = 0;
        
        while (gr.next()) {
            try {
                // Your processing logic here
                updateIncidentPriority(gr);
                processedCount++;
                totalProcessed++;
                
                // Log progress every 100 records
                if (processedCount % 100 === 0) {
                    gs.log('Processed ' + totalProcessed + ' records so far...');
                }
                
            } catch (error) {
                gs.error('Error processing record ' + gr.getUniqueValue() + ': ' + error.message);
                // Continue processing other records
            }
        }
        
        // Yield execution to prevent timeout (if in scheduled job)
        gs.sleep(100); // Brief pause between chunks
        
    } while (processedCount === chunkSize); // Continue if we got a full chunk
    
    // Log completion statistics
    var endTime = new Date().getTime();
    var executionTime = (endTime - startTime) / 1000;
    
    gs.log('Batch processing completed:');
    gs.log('- Total records processed: ' + totalProcessed);
    gs.log('- Execution time: ' + executionTime + ' seconds');
    gs.log('- Average records per second: ' + (totalProcessed / executionTime).toFixed(2));
}

// Method 2: Optimized Bulk Update with Batch Commits
function optimizedBulkUpdate() {
    var gr = new GlideRecord('task');
    
    // Use compound query with indexed fields
    gr.addQuery('state', 'IN', '1,2');
    gr.addQuery('priority', '4');
    gr.addQuery('sys_updated_on', '<', gs.daysAgoStart(7));
    
    // Set reasonable limit to prevent memory issues
    gr.setLimit(1000);
    gr.query();
    
    var updateCount = 0;
    var batchSize = 50;
    
    // Start transaction for batch processing
    var transaction = new GlideTransaction();
    
    try {
        while (gr.next()) {
            // Update the record
            gr.priority = '3'; // Increase priority
            gr.comments = 'Priority auto-updated due to age';
            gr.update();
            
            updateCount++;
            
            // Commit in batches to manage transaction size
            if (updateCount % batchSize === 0) {
                transaction.commit();
                transaction = new GlideTransaction(); // Start new transaction
                gs.log('Committed batch of ' + batchSize + ' updates. Total: ' + updateCount);
            }
        }
        
        // Commit remaining records
        if (updateCount % batchSize !== 0) {
            transaction.commit();
        }
        
        gs.log('Bulk update completed. Total records updated: ' + updateCount);
        
    } catch (error) {
        transaction.rollback();
        gs.error('Bulk update failed and rolled back: ' + error.message);
        throw error;
    }
}

// Method 3: Memory-Efficient Large Dataset Processing
function processLargeDatasetEfficiently() {
    var tableName = 'cmdb_ci';
    var processedTotal = 0;
    var hasMoreRecords = true;
    var lastSysId = '';
    
    while (hasMoreRecords) {
        var gr = new GlideRecord(tableName);
        
        // Use sys_id for cursor-based pagination (most efficient)
        if (lastSysId) {
            gr.addQuery('sys_id', '>', lastSysId);
        }
        
        // Add your business logic filters
        gr.addQuery('install_status', 'IN', '1,6'); // Installed or Reserved
        
        gr.orderBy('sys_id'); // Consistent ordering
        gr.setLimit(200); // Smaller chunks for large tables
        gr.query();
        
        var currentBatchCount = 0;
        
        while (gr.next()) {
            try {
                // Your processing logic
                processConfigurationItem(gr);
                
                currentBatchCount++;
                processedTotal++;
                lastSysId = gr.getUniqueValue();
                
            } catch (error) {
                gs.error('Error processing CI ' + gr.getUniqueValue() + ': ' + error.message);
            }
        }
        
        // Check if we have more records to process
        hasMoreRecords = (currentBatchCount === 200);
        
        gs.log('Processed batch: ' + currentBatchCount + ' records. Total: ' + processedTotal);
        
        // Small delay to prevent overwhelming the system
        gs.sleep(50);
    }
    
    gs.log('Large dataset processing completed. Total records: ' + processedTotal);
}

// Helper function example
function updateIncidentPriority(incidentGR) {
    // Example business logic
    if (incidentGR.getValue('business_impact') == '1' && incidentGR.getValue('urgency') == '1') {
        incidentGR.priority = '1'; // Critical
        incidentGR.update();
    }
}

function processConfigurationItem(ciGR) {
    // Example CI processing logic
    ciGR.last_discovered = new GlideDateTime();
    ciGR.update();
}

// Method 4: Performance Monitoring Wrapper
function monitoredBatchOperation(operationName, operationFunction) {
    var startTime = new Date().getTime();
    var memoryBefore = gs.getProperty('glide.script.heap.size', 'Unknown');
    
    gs.log('Starting operation: ' + operationName);
    gs.log('Memory before: ' + memoryBefore);
    
    try {
        var result = operationFunction();
        
        var endTime = new Date().getTime();
        var executionTime = (endTime - startTime) / 1000;
        var memoryAfter = gs.getProperty('glide.script.heap.size', 'Unknown');
        
        gs.log('Operation completed: ' + operationName);
        gs.log('Execution time: ' + executionTime + ' seconds');
        gs.log('Memory after: ' + memoryAfter);
        
        return result;
        
    } catch (error) {
        var endTime = new Date().getTime();
        var executionTime = (endTime - startTime) / 1000;
        
        gs.error('Operation failed: ' + operationName);
        gs.error('Execution time before failure: ' + executionTime + ' seconds');
        gs.error('Error details: ' + error.message);
        
        throw error;
    }
}

// Example usage of performance monitoring
function exampleMonitoredOperation() {
    monitoredBatchOperation('Incident Priority Update', function() {
        processRecordsInChunks();
        return 'Success';
    });
}
