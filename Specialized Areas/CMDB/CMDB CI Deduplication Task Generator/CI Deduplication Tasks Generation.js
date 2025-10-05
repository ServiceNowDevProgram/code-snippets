/**
 * This script re-checks all duplicate hardware CIs by serial number and creates
 * a de-duplication task for any group that does not already have an open task.
 * It leverages the global.CMDBDuplicateTaskUtils Script Include.
 */

(function() {
    
	var ciTable = 'cmdb_ci_hardware'; //Change to any CI table of your choosing

	var groupsFound = 0;
    var tasksCreated = 0;
    var groupsSkipped = 0;
	
    
    var taskUtil = new global.CMDBDuplicateTaskUtils();

    // Find all serial numbers that have duplicates using GlideAggregate.
    var ga = new GlideAggregate(ciTable);
    ga.addNotNullQuery('serial_number');
    ga.addQuery('serial_number', '!=', '');
    ga.addAggregate('COUNT', 'serial_number');
    ga.groupBy('serial_number');
    ga.addHaving('COUNT', '>', 1);
    ga.query();

    gs.info('Starting check for duplicate CIs by serial number...');

    while (ga.next()) {
        groupsFound++;
        var serialNumber = ga.getValue('serial_number');
        var sysIdArray = [];
        var taskExists = false;

        // For each duplicate serial number, get all associated CI sys_ids.
        var ciGr = new GlideRecord('cmdb_ci_hardware');
        ciGr.addQuery('serial_number', serialNumber);
        ciGr.query();
        while (ciGr.next()) {
            sysIdArray.push(ciGr.getUniqueValue());
        }

        // Check if ANY of the CIs in the group are already in an open task.
        for (var i = 0; i < sysIdArray.length; i++) {
            if (!taskUtil.hasNoOpenDuplicateTasks(sysIdArray[i])) {
                taskExists = true;
                break; // Found an open task, no need to check the others.
            }
        }

        // If no open task exists for this group, create one.
        if (taskExists) {
            groupsSkipped++;
            gs.info('--> Skipping Serial Number "' + serialNumber + '". It is already part of an open task.');
        } else {
            var sysIdString = sysIdArray.join(',');
            var newTaskId = taskUtil.createDuplicateTask(sysIdString);
            if (newTaskId) {
                tasksCreated++;
                gs.info('==> Successfully created task ' + newTaskId + ' for Serial Number "' + serialNumber + '".');
            } else {
                gs.error('==> FAILED to create task for Serial Number "' + serialNumber + '".');
            }
        }
    }

    // --- Final Summary ---
    gs.info('--- Re-check Complete ---');
    gs.info('Total Duplicate Groups Found: ' + groupsFound);
    gs.info('New Remediation Tasks Created: ' + tasksCreated);
    gs.info('Groups Skipped (Already in an open task): ' + groupsSkipped);
    gs.info('--------------------------');

})();
