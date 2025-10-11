(function() {
    // Configuration: Set to true to include inherited roles, false for directly assigned roles only
    var includeInheritedRoles = false;

    // Usernames to compare replace abel.tuter and abraham.lincoln with the user names you want to compare
    var usernameA = "abel.tuter";
    var usernameB = "abraham.lincoln";

    /**
     * Fetch active roles for a given user.
     * @param {string} username - The username to query roles for.
     * @param {boolean} includeInherited - Whether to include inherited roles.
     * @returns {Array} - Array of unique role names.
     */
    function getUserRoles(username, includeInherited) {
        var roles = [];
        var gr = new GlideRecord("sys_user_has_role");
        gr.addQuery("user.user_name", username);
        if (!includeInherited) {
            gr.addQuery("inherited", false);
        }
        gr.addQuery("state", "active");
        gr.query();
        while (gr.next()) {
            var roleName = gr.role.name.toString();
            // Ensure uniqueness
            if (roles.indexOf(roleName) === -1) {
                roles.push(roleName);
            }
        }
        return roles;
    }

    /**
     * Get items in list1 that are not in list2.
     * @param {Array} list1
     * @param {Array} list2
     * @returns {Array}
     */
    function difference(list1, list2) {
        var result = [];
        for (var i = 0; i < list1.length; i++) {
            if (list2.indexOf(list1[i]) === -1) {
                result.push(list1[i]);
            }
        }
        return result;
    }

    /**
     * Get items that exist in both lists.
     * @param {Array} list1
     * @param {Array} list2
     * @returns {Array}
     */
    function intersection(list1, list2) {
        var result = [];
        for (var i = 0; i < list1.length; i++) {
            if (list2.indexOf(list1[i]) !== -1 && result.indexOf(list1[i]) === -1) {
                result.push(list1[i]);
            }
        }
        return result;
    }

    // Fetch roles for both users
    var rolesUserA = getUserRoles(usernameA, includeInheritedRoles);
    var rolesUserB = getUserRoles(usernameB, includeInheritedRoles);

    // Compare roles
    var exclusiveToA = difference(rolesUserA, rolesUserB);
    var exclusiveToB = difference(rolesUserB, rolesUserA);
    var sharedRoles = intersection(rolesUserA, rolesUserB);

    // Output results
    gs.info("\nExclusive Role(s) to " + usernameA + ":\n\t" + exclusiveToA.join("\n\t"));
    gs.info("\nExclusive Role(s) to " + usernameB + ":\n\t" + exclusiveToB.join("\n\t"));
    gs.info("\nShared Role(s):\n\t" + sharedRoles.join("\n\t"));
})();
