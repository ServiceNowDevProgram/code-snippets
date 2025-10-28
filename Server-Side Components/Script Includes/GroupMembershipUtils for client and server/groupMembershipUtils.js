/**
 * This utility script include provides methods for managing and querying user-group memberships
 * in the sys_user_grmember table.
 * Accessible from both server-side and client-side (for AJAX-compatible methods).
 */
var GroupMembershipUtils = Class.create();
GroupMembershipUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Returns a comma-separated list of user sys_ids who are members of the specified group.
     * Can be called from both server and client sides.
     *
     * @param {string} [groupSysID] - (Optional) sys_id of the group. If not provided, expects 'group_sys_id' parameter (used in client-side call).
     * @returns {string} Comma-separated sys_ids of users in the group.
     */
    getGroupMembers: function(groupSysID) {
        var group = groupSysID ? groupSysID : this.getParameter('group_sys_id');
        if (!group) return;
        var users = [];

        var grGroupMembers = new GlideRecord('sys_user_grmember');
        grGroupMembers.addQuery('group', group);
        grGroupMembers.query();
        while (grGroupMembers.next()) {
            users.push(grGroupMembers.getValue('user'));
        }

        return users.join();
    },

    /**
     * Returns a comma-separated list of group sys_ids that the specified user is a member of.
     * Can be called from both server and client sides.
     *
     * @param {string} [userSysId] - (Optional) sys_id of the user. If not provided, expects 'user_sys_id' parameter (used in client-side call).
     * @returns {string} Comma-separated sys_ids of groups the user belongs to.
     */
    getUserGroups: function(userSysId) {
        var user = userSysId ? userSysId : this.getParameter('user_sys_id');
        if (!user) return;
        var groups = [];

        var grGroupMembers = new GlideRecord('sys_user_grmember');
        grGroupMembers.addQuery('user', user);
        grGroupMembers.query();
        while (grGroupMembers.next()) {
            groups.push(grGroupMembers.getValue('group'));
        }

        return groups.join();
    },

    /**
     * Adds multiple users to a specified group.
     * Prevents unique key violation error by checking if the user is already a member.
     *
     * **Server-side only.**
     *
     * @param {string} groupSysID - sys_id of the group.
     * @param {Array<string>} userSysIDs - Array of user sys_ids to be added to the group.
     * @returns {number} The count of successfully added group memberships.
     */
    addGroupMembers: function(groupSysID, userSysIDs) {
        if (!groupSysID || !userSysIDs) return 0;

        var count = 0;

        for (var i = 0; i < userSysIDs.length; i++) {
            var grGroupMembers = new GlideRecord('sys_user_grmember');
            grGroupMembers.addQuery('group', groupSysID);
            grGroupMembers.addQuery('user', userSysIDs[i]);
            grGroupMembers.query();

            // Only insert if membership does not already exist
            if (!grGroupMembers.next()) {
                grGroupMembers.initialize();
                grGroupMembers.setValue('group', groupSysID);
                grGroupMembers.setValue('user', userSysIDs[i]);

                if (grGroupMembers.insert()) {
                    count++;
                }
            }
        }

        return count;
    },

    /**
     * Removes multiple users from a specified group.
     * Only removes if a membership exists.
     *
     * **Server-side only.**
     *
     * @param {string} groupSysID - sys_id of the group.
     * @param {Array<string>} userSysIDs - Array of user sys_ids to be removed from the group.
     * @returns {number} The count of successfully removed group memberships.
     */
    removeGroupMembers: function(groupSysID, userSysIDs) {
        if (!groupSysID || !userSysIDs) return 0;

        var count = 0;

        for (var i = 0; i < userSysIDs.length; i++) {
            var grGroupMembers = new GlideRecord('sys_user_grmember');
            grGroupMembers.addQuery('group', groupSysID);
            grGroupMembers.addQuery('user', userSysIDs[i]);
            grGroupMembers.query();

            // Only delete if membership exists
            if (grGroupMembers.next()) {
                if (grGroupMembers.deleteRecord()) {
                    count++;
                }
            }
        }

        return count;
    },

    type: 'GroupMembershipUtils'
});
