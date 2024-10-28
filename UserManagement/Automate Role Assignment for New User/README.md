This snippet assigns specific roles to users based on their department within ServiceNow. 

Departments are matched against a predefined dictionary, and roles are applied accordingly. To modify, update the `rolesByDepartment` dictionary with your organization’s department-role mappings. 
```
var rolesByDepartment = {
        <department_name> : [role_1, role_2]
    };
```


This script ensures automatic and consistent role assignment, streamlining access control for large teams.