// ===============================================================
// Smart Incident Assignment – Auto-Assign Incident to Idle Members
// Purpose: Automatically assign disaster/emergency incidents to idle group members to ensure workload balance.
// ===============================================================

(function executeRule(current, previous /*null when async*/) {

    // --- Step 1: Check if short description contains disaster or emergency ---
    var desc = current.short_description.toLowerCase();
    if (desc.indexOf("disaster") === -1 && desc.indexOf("emergency") === -1) {
        return; // Exit if keywords are not present
    }

    // --- Step 2: Define the target assignment group ---
    var groupName = "Support Group";   //group name as per the requirment
    var groupGR = new GlideRecord('sys_user_group');
    groupGR.addQuery('name', groupName);
    groupGR.query();
    if (!groupGR.next()) return; // Exit if group not found
    var groupSysId = groupGR.sys_id;

    // --- Step 3: Set the assignment group ---
    current.assignment_group = groupSysId;

    // --- Step 4: Get all active members of the group ---
    var memberGR = new GlideRecord('sys_user_grmember');
    memberGR.addQuery('group', groupSysId);
    memberGR.query();

    var availableMembers = [];
    while (memberGR.next()) {
        var userId = memberGR.user.sys_id;

        // --- Step 5: Check if user already has an open incident ---
        var incidentGR = new GlideRecord('incident');
        incidentGR.addQuery('assigned_to', userId);
        incidentGR.addQuery('state', '<', 7); // Excludes Closed/Resolved
        incidentGR.query();

        if (!incidentGR.hasNext()) {
            availableMembers.push(userId); // Collect idle members
        }
    }

    // --- Step 6: Assign incident to first available idle member ---
    if (availableMembers.length > 0) {
        current.assigned_to = availableMembers[0];
    } else {
        gs.addInfoMessage('All members of the Support Closed Group currently have active incidents.');
    }

})(current, previous);
