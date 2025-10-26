/*
Scheduled Script Execution: Auto-cancel RITM if group manager approval pending after 30 days

This script:
- Finds RITM records older than 30 days
- Checks if any group manager approvals are still pending (state='requested')
- If so, cancels the RITM (sets state to 'Cancelled')
Usage:
- Schedule this script to run daily.
*/

// Calculate date 30 days ago
var thirtyDaysAgo = new GlideDateTime();
thirtyDaysAgo.addDaysUTC(-30);

// Query RITMs older than 30 days and not closed/cancelled already
var ritmGR = new GlideRecord('sc_req_item');
ritmGR.addQuery('sys_created_on', '<=', thirtyDaysAgo);
ritmGR.addEncodedQuery('stateIN1,2,112^cat_item=a24b1e113bc21e1050109c9c24e45a51');
ritmGR.query();

while (ritmGR.next()) {
    // Query approvals for this RITM from group managers - adjust condition accordingly
    var approvalGR = new GlideRecord('sysapproval_approver');
    approvalGR.addQuery('sysapproval', ritmGR.sys_id); // approvals linked to this RITM
    approvalGR.addQuery('state', 'requested'); // pending approvals
    approvalGR.query();

    if (approvalGR.hasNext()) {
        // Group manager approvals pending after 30 days => Cancel RITM
		
        ritmGR.state = 8; // Closed Cancelled
		ritmGR.assignment_group = '<assignment_group_name or sysid>'; //group ABC
        ritmGR.work_notes = 'Auto-cancelled due to no group manager approval within 30 days.';
        ritmGR.update();

    }
}
