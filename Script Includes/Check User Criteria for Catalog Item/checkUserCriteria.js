/**
 * Script Include to check if a user has access to a catalog item based on user criteria.
 * 
 * @param {string} item - The sys_id of the catalog item to check.
 * @param {boolean} [adminOverride] - Optional. Specifies whether an admin override should apply.
 * @param {string} [userToCheck] - Optional. The sys_id of the user to check access for. Defaults to the current user if not provided.
 * 
 * @returns {boolean} - Returns true if the user has access to the catalog item, false otherwise.
 */

var CheckCriteria = Class.create();
CheckCriteria.prototype = {
    initialize: function() {},
    itemCriteria: function(item, adminOverride, userToCheck) {		

		// Determine the user object and user ID, using provided userToCheck or defaulting to the current user
        var userObj = !gs.nil(userToCheck) ? gs.getUser().getUserByID(userToCheck) : gs.getUser(); 
        var userId = !gs.nil(userToCheck) ? userToCheck : gs.getUserID();

		// Admin override: if the user is an admin and adminOverride is not set to false, return true
        if(adminOverride != false && userObj.hasRole('admin')) {
			return true;
		}

		// Error handling: Ensure the item parameter is provided and not null
        if (gs.nil(item)) {
            gs.error('CheckCriteria().itemCriteria() failed: item parameter is missing or null, item: ' + item);
            return;
        }

		// Get the "Available for" and "Not Available for" user criteria for the catalog item
        var availableForUC = this.getUserCritria(item, true);
        var notAvailableForUC = this.getUserCritria(item, false);

		// Check if the user matches the "Not Available for" criteria
        if(sn_uc.UserCriteriaLoader.userMatches(userId, notAvailableForUC)) {
			return false; // User does not have access
		} 
        // Check if the user matches the "Available for" criteria
        else if (sn_uc.UserCriteriaLoader.userMatches(userId, availableForUC)) {
			return true; // User has access
		} 
        // If user doesn't match any criteria, they have no access
        else {
			return false;
		}
    },

    /**
     * Retrieves the user criteria for a catalog item.
     * 
     * @param {string} item - The sys_id of the catalog item.
     * @param {boolean} available - If true, fetch the "Available for" criteria. If false, fetch the "Not Available for" criteria.
     * 
     * @returns {Array<string>} - An array of user criteria sys_ids for the catalog item.
     */
    getUserCritria: function(item, available) {
		// Error handling: Ensure the item parameter is provided and not null
        if (gs.nil(item)) {
            gs.error('CheckCriteria().getUserCritria() failed: item parameter is missing or null, item: ' + item);
            return;
        }
        
        var returnArr = [];
		// Determine the correct table based on whether we're checking "Available for" or "Not Available for"
        var tableToCheck = available == false ? 'sc_cat_item_user_criteria_no_mtom' : 'sc_cat_item_user_criteria_mtom';

        // Query the user criteria table for the catalog item
        var ucCheckGr = new GlideRecord(tableToCheck);
        ucCheckGr.addQuery('sc_cat_item', item);
        ucCheckGr.query();
		
		// Loop through the results and collect the user criteria
        while (ucCheckGr.next()) {
            returnArr.push(ucCheckGr.getValue('user_criteria'));
        }
        
		// Return the array of user criteria sys_ids
        return returnArr;
    },

    type: 'CheckCriteria'
};
