var CheckCriteria = Class.create();
CheckCriteria.prototype = {
    initialize: function() {},

    /**
     * Checks if the user meets the criteria to access the catalog item.
     * 
     * @param {string} item - The sys_id of the catalog item.
     * @param {boolean} [adminOverride] - Optional. Whether admin role should override the criteria check. Defaults to false if not provided.
     * @param {string} [userToCheck] - Optional. The user ID of the user whose access is being checked. Defaults to the current user if not specified.
     * 
     * @returns {boolean} - True if the user has access to the catalog item, otherwise false.
     */
    itemCriteria: function(item, adminOverride, userToCheck) {
        // Set default value for adminOverride if not provided
        adminOverride = (typeof adminOverride !== 'undefined') ? adminOverride : false;

        // Early exit if item is nil or missing
        if (gs.nil(item)) {
            gs.error('CheckCriteria().itemCriteria() failed: item parameter is missing or null, item: ' + item);
            return false;
        }

        // Get the user object and user ID, defaulting to the current user if userToCheck is not provided
        var userObj = !gs.nil(userToCheck) ? gs.getUser().getUserByID(userToCheck) : gs.getUser();
        var userId = userObj.getID();

        // Admin override: if the user is an admin and adminOverride is true, return true
        if (adminOverride && userObj.hasRole('admin')) {
            return true;
        }

        // Fetch "Available for" and "Not Available for" user criteria
        var availableForUC = this.getUserCritria(item, true);
        var notAvailableForUC = this.getUserCritria(item, false);

        // Check if the user matches the "Not Available for" criteria first
        if (sn_uc.UserCriteriaLoader.userMatches(userId, notAvailableForUC)) {
            return false;
        }

        // Check if the user matches the "Available for" criteria
        return sn_uc.UserCriteriaLoader.userMatches(userId, availableForUC);
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
        // Early exit if item is nil or missing
        if (gs.nil(item)) {
            gs.error('CheckCriteria().getUserCritria() failed: item parameter is missing or null, item: ' + item);
            return [];
        }

        // Define table name constants
        var TABLE_AVAILABLE = 'sc_cat_item_user_criteria_mtom';
        var TABLE_NOT_AVAILABLE = 'sc_cat_item_user_criteria_no_mtom';

        // Select appropriate table based on availability flag
        var tableToCheck = available ? TABLE_AVAILABLE : TABLE_NOT_AVAILABLE;

        // Query user criteria from the appropriate table
        var ucCheckGr = new GlideRecord(tableToCheck);
        ucCheckGr.addQuery('sc_cat_item', item);
        ucCheckGr.query();

        // Store user criteria sys_ids in an array
        var returnArr = [];
        while (ucCheckGr.next()) {
            returnArr.push(ucCheckGr.getValue('user_criteria'));
        }

        return returnArr;
    },

    type: 'CheckCriteria'
};
