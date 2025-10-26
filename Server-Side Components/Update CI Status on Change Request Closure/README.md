Update CI Status on Change Request Closure

1. Write a Business Rule - After Update
2. Select Change Request Table and Execute Condition as When Change State = Closed
3. Run only when Change Request is moving to closed
4. Query all CI relationships for this Change Request
5. Update all the Related CIs (cmdb_ci) linked through the task_ci table.
