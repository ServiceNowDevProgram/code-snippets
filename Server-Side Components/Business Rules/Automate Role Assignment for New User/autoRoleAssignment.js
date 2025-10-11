// Script to automatically assign roles based on user department
(function executeRule(current, previous /*null when async*/) {
    var department = current.department.getDisplayValue();
    
    // Define roles by department
    var rolesByDepartment = {
        "IT": ["itil", "asset"],
        "HR": ["hr_manager", "employee"],
        "Finance": ["finance_analyst", "approver"]
    };
    
    // Remove existing roles
    current.roles = [];
    
    // Assign new roles based on department
    if (rolesByDepartment[department]) {
        rolesByDepartment[department].forEach(function(role) {
            current.roles.add(role);
        });
        current.update();
    }
})(current, previous);
