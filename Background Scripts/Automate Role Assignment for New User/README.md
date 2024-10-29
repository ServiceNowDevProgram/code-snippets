# Overview
This snippet for ServiceNow developers automate the process of assigning roles to users based on their department. It helps to simplify user role management, especially useful in organizations where specific departments require predefined access levels. 


# How It Works
The script:
- **Identifies the User's Department**: Retrieves the department name of the current user, which is then used as a key to look up relevant roles.
- **Defines Role Mappings**: Uses a dictionary `rolesByDepartment` to map departments (like IT, HR, and Finance) to arrays of role names.
- **Assigns or Removes Roles**:
    - Clears Existing Roles: Empties the user’s current role list to avoid duplicate or outdated assignments.
    - Adds New Roles: Based on the department lookup, the script assigns the appropriate roles from the predefined list.
    
# Implementation

Update `rolesByDepartment` to reflect your organization’s specific department-role mappings.
```
var rolesByDepartment = {
        <department_name> : [role_1, role_2]
    };
```