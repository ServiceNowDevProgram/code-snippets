(function executeRule(current, previous /*null when async*/ ) {

    var appr = new GlideRecord('sysapproval_approver');
    appr.addQuery('document_id', current.document_id);//look for approval requests for same task
    appr.addQuery('approver', current.approver); //same approver exists?
    appr.addQuery('state', 'approved');
	appr.addQuery('group','');//ensure this scenario not applied for group type approvals
	appr.query();
    if (appr.next()) {
        current.state = 'approved';
        current.comments = 'Auto-approved due to duplicate approver at multiple levels.';
    }

})(current, previous);