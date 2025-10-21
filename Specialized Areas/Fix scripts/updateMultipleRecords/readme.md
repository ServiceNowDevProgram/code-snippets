## update Multiple Records
These 2 scripts are used to update Multiple records but in different ways
### update_multiple_records.script file
In this script it uses `updateMultiple()` Function 
1. In this script it uses `updateMultiple()` Function 
2. Automatically updates system fields like sys_updated_by and sys_updated_on.
3. Cannot skip system fields using autoSysFields(false).
4. Always triggers workflows, business rules, and script actions.
5. Cannot disable per record.

### update_multiple_records_v2.script file
In this script it uses `update()` Function 
1. update() is a GlideRecord method used to update a single record in the database. It is commonly used inside a loop to update multiple records individually.
2. Can skip updating system fields using autoSysFields(false).
3. Can skip workflows/business rules using setWorkflow(false). 