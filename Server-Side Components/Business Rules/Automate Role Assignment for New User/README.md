# Overview
This snippet for ServiceNow developers automate the process of assigning roles to users based on their department. It helps to simplify user role management, especially useful in organizations where specific departments require predefined access levels. 

# How It Works
In Business Rule settings within ServiceNow: 
- Trigger: runs the script "before" an update to the `sys_user` table when a user’s department changes.
- Condition: Only triggers when `current.department.changes()` - ensures that the script only runs when the department field is modified.
- Role Mapping: Uses the `rolesByDepartment` dictionary to assign roles based on the user’s department.
    
# Implementation

Edit `rolesByDepartment` to match your organization’s needs.

```
var rolesByDepartment = {
        <department_name> : [role_1, role_2]
    };
```