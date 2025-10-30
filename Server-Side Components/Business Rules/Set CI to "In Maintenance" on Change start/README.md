Set CI to "In Maintenance" on Change start 

1. Write a Business Rule - After Update
2. Select the Change Request Table
3. Add a Condition when Change state = "Implement"
4. task_ci is the relationship table that links tasks to configuration items (ci_item).
5. Create a GlideRecord object for the CI table.
6. Finds all relationship records where the task field equals this Change Request.
7. Set the CI’s install_status to "In Maintenance".
