var currentUser = gs.getUser(); //  current logged-in user
var userGR = new GlideRecord('sys_user');

if (userGR.get(currentUser.getID())) {
    // Loop until we find a user who has no manager
    while (userGR.manager) {
        var managerID = userGR.getValue('manager');
        var managerGR = new GlideRecord('sys_user');
        
		managerGR.get(managerID);
            userGR = managerGR; // Move up one level 
           }
    gs.print("Top-level Manager: " + userGR.getDisplayValue('name'));
} else {
    gs.print("User not found.");
}

// The top-level manager is always the person in the hierarchy without a manager.
