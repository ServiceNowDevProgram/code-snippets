(function(query) {
    var results = [];
    var getuserdelegateof = new GlideRecord('sys_user_delegate');
    getuserdelegateof.addQuery('delegate', gs.getUserID());
	getuserdelegateof.addEncodedQuery("endsONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()");
    getuserdelegateof.query();
    if (getuserdelegateof.next()) {
        var grApprovals = new GlideRecord('sysapproval_approver');
        grApprovals.addQuery('state', 'requested');
        grApprovals.addQuery('approver', getuserdelegateof.user);
        var sQuery = "sysapproval.short_descriptionLIKE" + query + "^ORsysapproval.numberLIKE" + query;
        grApprovals.addQuery(sQuery);
        grApprovals.query();
        while (grApprovals.next()) {
            var myapproval = {};
            myapproval.table = 'sysapproval_approver';
            myapproval.sys_id = grApprovals.getValue("sys_id");
            myapproval.number = grApprovals.sysapproval.number + "";
            myapproval.short_description = grApprovals.sysapproval.short_description + "";
            myapproval.sys_created_on = grApprovals.getValue('sys_created_on');
            myapproval.url = "?id=approvals&table=sysapproval_approver&sys_id=" + grApprovals.getValue("sys_id");
            myapproval.label = grApprovals.sysapproval.number;
            myapproval.primary = grApprovals.sysapproval.number;
            results.push(myapproval);
        }

        return results;
    } else {
        var grApprovalsare = new GlideRecord('sysapproval_approver');
        grApprovalsare.addQuery('state', 'requested');
        grApprovalsare.addQuery('approver', gs.getUserID());
        var sQuery = "sysapproval.short_descriptionLIKE" + query + "^ORsysapproval.numberLIKE" + query;
        grApprovalsare.addQuery(sQuery);
        grApprovalsare.query();
        while (grApprovalsare.next()) {
            var myapprovals = {};
            myapprovals.table = 'sysapproval_approver';
            myapprovals.sys_id = grApprovalsare.getValue("sys_id");
            myapprovals.number = grApprovalsare.sysapproval.number + "";
            myapprovals.short_description = grApprovalsare.sysapproval.short_description + "";
            myapprovals.sys_created_on = grApprovalsare.getValue('sys_created_on');
            myapprovals.url = "?id=approvals&table=sysapproval_approver&sys_id=" + grApprovalsare.getValue("sys_id");
            myapprovals.label = grApprovalsare.sysapproval.number;
            myapprovals.primary = grApprovalsare.sysapproval.number;
            results.push(myapprovals);
        }
        return results;
    }


})(query);
