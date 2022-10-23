Background script to send approval reminder to Approver Delegates:
========================================
var appr = new GlideRecord('sysapproval_approver');
appr.addQuery('state', 'requested');
appr.addQuery('sysapproval.sys_class_name', 'sc_req_item');
appr.addEncodedQuery("sysapproval.numberLIKERITM0010468");
appr.query();
while(appr.next())
	{
    //" approval.reminded" is a registered event to trigger notificationn email to  their delegates to approve or reject approval requests when approvar not available
		gs.eventQueue("approval.reminded" , appr , appr.approver , appr.approver.getUserName());
	}


gs.print(appr.getRowCount());
