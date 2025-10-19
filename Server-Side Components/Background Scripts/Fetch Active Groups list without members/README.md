A background script that identifies and returns all active groups in ServiceNow that have no members assigned to them.

## What It Does

The script:
1. Queries all active groups in the `sys_user_group` table
2. For each group, checks the `sys_user_grmember` table for member count
3. Uses GlideAggregate to efficiently count members per group
4. Collects group names (or sys_ids) that have zero members
5. Outputs the complete list of empty groups to the system log

## Configuration Options

- **Group names vs IDs**: Uncomment line 21 to collect group sys_ids instead of names
- **Limit results**: Uncomment line 6 to limit the query to 1500 groups for large instances
- **Additional filtering**: Modify the encoded query on line 3 to add specific group criteria
