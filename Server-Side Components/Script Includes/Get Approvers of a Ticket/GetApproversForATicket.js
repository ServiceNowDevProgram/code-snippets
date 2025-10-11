var GetApproversForATicket = Class.create();
GetApproversForATicket.prototype = {
    initialize: function() {},

    getApprovers: function(sysId) {

        var approvalUsers = [];
        var grApproval = new GlideRecord('sysapproval_approver');
        grApproval.addQuery('sysapproval.sys_id', sysId);
        grApproval.query();

        while (grApproval.next()) {
            approvalUsers.push(grApproval.approver.toString());
        }

        return approvalUsers;
    },

    type: 'GetApproversForATicket'
};