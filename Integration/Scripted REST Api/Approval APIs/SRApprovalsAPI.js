/**
 * APIs for Approval/Rejection on sysapproval_approver table
 * 
 * @class 
 * @author Amit Gujarathi
 * @memberof global.module:sys_script_include
 */

var SRApprovalsAPI = Class.create();
SRApprovalsAPI.prototype = {
    initialize: function() {},

    /**
     * Approves the record pending for Approval
     * 
     * @param {any} sysId Sys ID of the record to be approved
     * @returns {any} 
     */

    taskApproved: function(sysID, comment) {

        if (gs.nil(sysID)) {
            return sn_ws_err.NotFoundError('Please enter a Valid Record');
        }

        if (!this.verifySysId(sysID)) {

            return sn_ws_err.NotFoundError('Please enter a valid record!');

        }

        if (!this.verifyRecordAction(sysID)) {

            var uID = gs.getUserID();
            var recApprover = new GlideRecordSecure("sysapproval_approver");

            recApprover.addQuery('state', 'requested');
            recApprover.addQuery('sys_id', sysID);
            recApprover.addEncodedQuery('approver=' + uID + '^ORapprover.sys_idIN' + this.getUser());
            recApprover.query();
            if (recApprover.next()) {
                recApprover.comments.setJournalEntry(comment);
                recApprover.setValue('state', 'approved');
                recApprover.update();
                return ('Record has been Approved!');
            } else {
                {
                    var serverError = new sn_ws_err.ServiceError();
                    serverError.setStatus(403);
                    serverError.setMessage('You are not authorized to perform this action');
                    return serverError;

                }
            }
        } else {
            var recordActionError = new sn_ws_err.ServiceError();
            recordActionError.setStatus(403);
            recordActionError.setMessage('This record has been actioned previously!');
            return recordActionError;

        }

    },


    /**
     * Gets the users who has appointed the current user as their delegates
     */

    getUser: function() {

        var appr = [];
        var del = new GlideRecord('sys_user_delegate');
        del.addQuery('delegate', gs.getUserID());
        del.addEncodedQuery('approvals=true^ends>=javascript:gs.beginningOfToday()');
        del.query();
        while (del.next()) {
            appr.push(del.user.sys_id);

        }
        return appr.toString();

    },

    /**
     * Verifies if the sys_id a valid in the sysapproval_approver table
     */


    verifySysId: function(sysid) {

        var recApprover = new GlideRecord("sysapproval_approver");
        var result = false;
        if (recApprover.get(sysid)) {
            result = true;
        }
        return result;

    },

    /**
     * Verifies if the record is actioned -  stateINapproved,rejected
     */


    verifyRecordAction: function(sysid) {

        var result = false;
        var recAction = new GlideRecord("sysapproval_approver");
        recAction.addEncodedQuery('state!=requested^sys_id=' + sysid);
        recAction.query();
        if (recAction.next()) {
            result = true;
        }
        return result;

    },

    /**
     * Rejects the record pending for Approval
     * 
     * @param {any} sysId Sys ID of the record to be approved and comment text for rejection
     * @returns {any} 
     */

    taskRejected: function(sysID, comment) {
        if (gs.nil(sysID)) {
            return sn_ws_err.NotFoundError('Record not Found!');
        }

        if (gs.nil(comment)) {


            var rejectComment = new sn_ws_err.ServiceError();
            rejectComment.setStatus(403);
            rejectComment.setMessage('Rejection comments are mandatory!');
            return rejectComment;



        }

        if (!this.verifySysId(sysID)) {

            return sn_ws_err.BadRequestError('Please enter a valid record!');

        }

        if (!this.verifyRecordAction(sysID)) {
            var uID = gs.getUserID();
            var recApprover = new GlideRecordSecure("sysapproval_approver");


            recApprover.addQuery('state', 'requested');
            recApprover.addQuery('sys_id', sysID);
            recApprover.addEncodedQuery('approver=' + uID + '^ORapprover.sys_idIN' + this.getUser());
            recApprover.query();

            if (recApprover.next()) {

                recApprover.comments.setJournalEntry(comment);
                recApprover.setValue('state', 'rejected');
                recApprover.update();

                return ('Record has been Rejected!');
            } else {

                {
                    var serverError = new sn_ws_err.ServiceError();
                    serverError.setStatus(403);
                    serverError.setMessage('You are not authorized to perform this action');
                    return serverError;

                }
            }

        } else {
            var recordActionError = new sn_ws_err.ServiceError();
            recordActionError.setStatus(403);
            recordActionError.setMessage('This record has been actioned previously!');
            return recordActionError;

        }

    },

    type: 'SRApprovalsAPI'
};
