# GlideRecord Conditional Clone

## Description
This snippet clones an existing record in a ServiceNow table while allowing optional field overrides.  
It is useful for duplicating incidents, tasks, or custom records and modifying specific fields such as `assigned_to`.

## Prerequisites
- Server-side context (Background Script, Business Rule, or Script Include)
- Access to the table
- Familiarity with GlideRecord and sys_id

## Note

- Works in Global Scope
- Server-side execution only
- Ensures sys_id and system fields are not copied to avoid conflicts
- Returns the sys_id of the new record, or null if cloning fails

## Usage
```javascript
// Clone an incident and assign it to a new user
cloneRecord('incident', 'abc123sysid', {assigned_to: 'new_user_sysid'});

// Clone a task without changing any fields
cloneRecord('task', 'xyz789sysid', {});
```

## Output
```
Record cloned successfully. New sys_id: <sys_id>
```

## Tips

- Use fieldOverrides to update only specific fields without manually modifying the cloned record

