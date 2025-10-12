# Update fields while preserving system fields (Background Script)

This background script pattern demonstrates how to update user editable fields on a record while preserving system managed fields (such as sys_created_by, sys_created_on, sys_updated_by, sys_updated_on, and sys_mod_count) and avoiding unintended side effects.

## Purpose

When programmatically updating records you may want to:
- Update a subset of fields (business fields) while leaving system fields untouched.
- Preserve created/updated metadata when performing a migration or bulk update in a safe way.

This snippet shows a conservative approach: copy only allowed fields from a source object, avoid writing system fields, and use GlideRecord's update operations safely.

## Behavior

1. Initializes a GlideRecord object for a specified table.
2. Applies a query condition to filter which records should be updated.
3. Iterates through matching records using a while (gr.next()) loop.
4. Temporarily disables:
    - System field updates (sys_updated_by, sys_updated_on)
    - Business rules, flows, and workflows
5. Sets new field values using setValue() for both normal and reference fields.
6. Saves the updated records with update().


## Important notes and options

- Do NOT set or copy fields that start with `sys_` (for example: `sys_created_by`, `sys_created_on`, `sys_updated_on`, `sys_mod_count`). These are system-controlled and writing them directly can lead to audit and integrity issues.
- To prevent side effects from business rules or workflows, you can call `gr.setWorkflow(false)` and `gr.autoSysFields(false)` 
- When running bulk updates, batch the records and monitor system performance. Use indexes on query fields and limit the scope of updates.



