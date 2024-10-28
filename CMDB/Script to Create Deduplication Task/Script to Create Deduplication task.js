var taskSysId = new CMDBDuplicateTaskUtils().createDuplicateTask(""); //Enter the sys_id of both correct and incorrect CI by using ',' seperated.
gs.print(taskSysId); // Run the fix script and it will generate the task_sys_id for the 'reconcile_duplicate_task' table.
