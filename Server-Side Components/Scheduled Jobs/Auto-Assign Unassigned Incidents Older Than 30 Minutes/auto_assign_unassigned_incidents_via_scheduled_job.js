(function executeAutoAssignment() {
    // --- CONFIGURABLE SETTINGS ---
    var MINUTES_DELAY = 30;  // Only assign incidents older than this many minutes

    // --- COMPUTE TIME CUTOFF ---
    var cutoffTime = new GlideDateTime();
    cutoffTime.addMinutes(-MINUTES_DELAY); // incidents created before this time are eligible

    // --- QUERY: Find eligible unassigned incidents ---
    var incGr = new GlideRecord('incident');
    incGr.addNullQuery('assigned_to');                // incident not yet assigned
    incGr.addNotNullQuery('assignment_group');        // has an assignment group
    incGr.addQuery('sys_created_on', '<=', cutoffTime); // created at least 30 minutes ago
    incGr.query();

    var totalAssigned = 0;

    // --- LOOP THROUGH EACH ELIGIBLE INCIDENT ---
    while (incGr.next()) {
        var groupSysId = incGr.assignment_group.toString();
        if (!groupSysId) {
            gs.info('[AutoAssign] Skipped ' + incGr.number + ': No assignment group defined.');
            continue;
        }

        // --- FETCH ACTIVE USERS IN THAT ASSIGNMENT GROUP ---
        var members = getActiveGroupMembers(groupSysId);

        if (members.length === 0) {
            gs.info('[AutoAssign] Skipped ' + incGr.number + ': No active users found in group ' + incGr.assignment_group.name);
            continue;
        }

        // --- PICK A RANDOM USER ---
        var assignedUser = getRandomElement(members);

        // --- ASSIGN AND UPDATE ---
        incGr.assigned_to = assignedUser;
        incGr.update();

        gs.info('[AutoAssign] Incident ' + incGr.number + ' assigned to user: ' + assignedUser);
        totalAssigned++;
    }

    gs.info('[AutoAssign] Total incidents auto-assigned: ' + totalAssigned);

    // -------------------------------------------------------------------
    // --- HELPER FUNCTIONS ---
    // -------------------------------------------------------------------

    /**
     * Fetches all active users in a given assignment group.
     * @param {String} groupSysId - sys_id of assignment group
     * @returns {Array} - Array of user sys_ids
     */
    function getActiveGroupMembers(groupSysId) {
        var users = [];
        var grMember = new GlideRecord('sys_user_grmember');
        grMember.addQuery('group', groupSysId);
        grMember.addJoinQuery('sys_user', 'user', 'sys_id');
        grMember.addQuery('user.active', true);
        grMember.query();

        while (grMember.next()) {
            users.push(grMember.user.toString());
        }
        return users;
    }

    /**
     * Returns a random element from an array.
     * @param {Array} arr
     * @returns {*} Random element
     */
    function getRandomElement(arr) {
        if (!arr || arr.length === 0) return null;
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

})();

