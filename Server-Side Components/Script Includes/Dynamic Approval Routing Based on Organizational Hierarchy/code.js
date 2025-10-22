var ApprovalRouter = Class.create();
ApprovalRouter.prototype = {
    initialize: function() {},

    /**
     * Returns an array of approver sys_ids based on user's department and role.
     * @param {String} userId - Sys ID of the user for whom to find approvers.
     * @returns {Array} approverSysIds - List of approver sys_ids.
     */
    getApprovers: function(userId) {
        var approverSysIds = [];

        // Get user record
        var userGR = new GlideRecord('sys_user');
        if (!userGR.get(userId)) {
            gs.error('User not found: ' + userId);
            return approverSysIds;
        }

        // Add manager if exists
        if (userGR.manager) {
            approverSysIds.push(userGR.manager.toString());
        }

        // Add department head if available
        if (userGR.department) {
            var deptGR = new GlideRecord('cmn_department');
            if (deptGR.get(userGR.department)) {
                if (deptGR.u_department_head) {
                    approverSysIds.push(deptGR.u_department_head.toString());
                }
            }
        }

        // Add role-based approvers (e.g., Finance Approver)
        var roleGR = new GlideRecord('sys_user_has_role');
        roleGR.addQuery('user', userId);
        roleGR.query();
        while (roleGR.next()) {
            var roleName = roleGR.role.name;
            if (roleName == 'finance_approver') {
                // Add finance head
                var financeGR = new GlideRecord('sys_user');
                financeGR.addQuery('title', 'Finance Head');
                financeGR.setLimit(1);
                financeGR.query();
                if (financeGR.next()) {
                    approverSysIds.push(financeGR.sys_id.toString());
                }
            }
        }

        return approverSysIds;
    },

    type: 'ApprovalRouter'
};
