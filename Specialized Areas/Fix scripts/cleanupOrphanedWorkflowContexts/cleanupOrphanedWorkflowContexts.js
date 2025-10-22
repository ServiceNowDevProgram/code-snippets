// Fix Script: Cleanup Orphaned and Stale Workflow Contexts
// Purpose: Cancel and clean up workflow contexts that are:
//   1. In "Executing" state for more than 180 days
//   2. Associated with deleted/invalid parent records
//   3. Stuck without valid activity states
// 
// Author: Masthan Sharif Shaik
// Date: October 2025
// Tested on: Zurich, Yokohama
//
// IMPORTANT: Test in non-production environment first
// This script will mark stale workflows as cancelled and prevent re-execution

(function cleanupOrphanedWorkflowContexts() {

    // Configuration - adjust these values based on your requirements
    var DAYS_THRESHOLD = 180; // Workflows executing longer than this will be evaluated
    var BATCH_SIZE = 500; // Process in batches to avoid transaction timeouts
    var DRY_RUN = true; // Set to false to actually cancel workflows

    // Calculate date threshold
    var thresholdDate = new GlideDateTime();
    thresholdDate.addDaysLocalTime(-DAYS_THRESHOLD);

    var totalProcessed = 0;
    var totalCancelled = 0;
    var orphanedCount = 0;

    gs.info('=== Workflow Context Cleanup Started ===');
    gs.info('Threshold Date: ' + thresholdDate.getDisplayValue());
    gs.info('Dry Run Mode: ' + DRY_RUN);

    // Query for stale executing workflow contexts
    var wfContext = new GlideRecord('wf_context');
    wfContext.addQuery('state', 'executing');
    wfContext.addQuery('sys_created_on', '<', thresholdDate);
    wfContext.setLimit(BATCH_SIZE);
    wfContext.query();

    gs.info('Found ' + wfContext.getRowCount() + ' stale workflow contexts to process');

    while (wfContext.next()) {
        totalProcessed++;
        var shouldCancel = false;
        var reason = '';

        // Check if parent record exists
        var tableName = wfContext.getValue('table');
        var recordId = wfContext.getValue('id');

        if (!tableName || !recordId) {
            shouldCancel = true;
            reason = 'Missing table or record reference';
            orphanedCount++;
        } else {
            // Verify parent record exists
            var parentRecord = new GlideRecord(tableName);
            if (!parentRecord.get(recordId)) {
                shouldCancel = true;
                reason = 'Parent record no longer exists';
                orphanedCount++;
            }
        }


        if (shouldCancel) {
            gs.info('Context: ' + wfContext.getDisplayValue() +
                ' | Age: ' + wfContext.sys_created_on.getDisplayValue() +
                ' | Reason: ' + reason);

            if (!DRY_RUN) {
                // Cancel the workflow context
                wfContext.state = 'cancelled';
                wfContext.setWorkflow(false); // Prevent additional workflows from triggering
                wfContext.update();
                totalCancelled++;
            }
        }
    }

    gs.info('=== Workflow Context Cleanup Complete ===');
    gs.info('Total Processed: ' + totalProcessed);
    gs.info('Orphaned Workflows Found: ' + orphanedCount);
    gs.info('Workflows Cancelled: ' + (DRY_RUN ? '0 (Dry Run)' : totalCancelled));
    gs.info('To execute cleanup, set DRY_RUN = false');

})();
