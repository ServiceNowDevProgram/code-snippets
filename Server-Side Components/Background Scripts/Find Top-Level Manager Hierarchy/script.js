var currentUser = gs.getUser(); // Current logged-in user
var userGR = new GlideRecord('sys_user');
var maxLevels = 7; 
var currentLevel = 0;

if (userGR.get(currentUser.getID())) {

    // Loop until we find a user who has no manager or reach max level
    while (userGR.manager && currentLevel < maxLevels) {
        var managerID = userGR.getValue('manager');
        var managerGR = new GlideRecord('sys_user');

        if (managerGR.get(managerID)) {
            userGR = managerGR; // Move up one level
            currentLevel++;    
			// gs.print(" Level " + currentLevel + " Manager: " + userGR.getDisplayValue('name'));
        } else {
            break; // Manager record not found
        }
    }

    gs.print("Top-level (or Level " + currentLevel + ") Manager: " + userGR.getDisplayValue('name'));
} else {
    gs.print("User not found.");
}
