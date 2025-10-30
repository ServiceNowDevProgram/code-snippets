Set CI to In Maintenance on Change start 

1. Write a Business Rule - After Update
2. Select the Change Request Table
3. Add a Condition that Change state = "Implement"
4. task_ci is the relationship table that links tasks to configuration items (ci_item)
5. Finds all relationship records where the task field equals this Change Request
6. Retrieve the CI whose sys_id is stored in ciRel.ci_item, It returns true if found.
7. Set the CI’s install_status to In Maintenance.
