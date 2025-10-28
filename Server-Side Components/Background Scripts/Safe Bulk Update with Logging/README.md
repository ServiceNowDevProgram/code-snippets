# Safe Bulk Record Update with Logging

## Overview
Efficiently update multiple records in batch with error handling, progress tracking, and logging to prevent timeouts and data loss.

## What It Does
- Updates records in configurable batch sizes
- Logs progress for monitoring
- Handles individual record errors without stopping batch
- Prevents script timeout with batch processing
- Tracks success/failure counts
- Logs detailed error information

## Use Cases
- Bulk data migrations
- Mass field updates after deployment
- Scheduled bulk corrections
- Data cleanup operations
- Batch status updates across records

## Files
- `bulk_update_with_progress.js` - Background Script for safe bulk updates

## How to Use

### Option 1: Run as Background Script
1. Go to **System Diagnostics > Script Background**
2. Copy code from `bulk_update_with_progress.js`
3. Modify the table name and query filter
4. Execute and monitor logs

### Option 2: Create as Scheduled Job
1. Go to **System Scheduler > Scheduled Jobs**
2. Create new job with the script code
3. Schedule for off-peak hours
4. Logs will be available in System Logs

## Example Usage
```javascript
// Customize these variables:
var TABLE = 'incident';
var FILTER = "priority=1^state=2"; // Your query condition
var BATCH_SIZE = 100;
var FIELD_TO_UPDATE = 'assignment_group'; // Field to update
var NEW_VALUE = '123456789abc'; // New value

// Run the script - it handles everything else
```

## Key Features
- **Batch Processing**: Prevents timeout by processing records in chunks
- **Error Resilience**: Continues on error, logs details
- **Progress Tracking**: Logs every N records updated
- **Flexible**: Works with any table and field
- **Safe**: Won't crash on individual record failures
- **Auditable**: Detailed logging of all operations

## Output Examples
```
[Bulk Update Started] Processing incidents with filter: priority=1
[Progress] Updated 100 records successfully (5 errors)
[Progress] Updated 200 records successfully (8 errors)
[Bulk Update Complete] Total: 250 | Success: 242 | Errors: 8
[Failed Records] 7af24b9c: User already has assignment
[Failed Records] 8bd35c8d: Invalid assignment group
```

## Performance Notes
- Batch size of 100 is optimal for most tables
- Adjust batch size based on available resources
- Run during maintenance windows for large updates
- Monitor system logs during execution

## Customization
```javascript
// Change batch size for your table size
var BATCH_SIZE = 50; // For smaller batches
var BATCH_SIZE = 200; // For larger tables

// Different field update logic
record.setValue(FIELD_TO_UPDATE, NEW_VALUE);
// Or use gs.getProperty() for configuration
```

## Requirements
- ServiceNow instance
- Access to Background Scripts or Scheduled Jobs
- Write access to target table
- Appropriate table and field permissions

## Related APIs
- [GlideRecord Query API](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_UsingGlideRecord.html)
- [GlideSystem Logging](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_SystemLog.html)
- [Best Practices for Bulk Operations](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_BulkOperations.html)
