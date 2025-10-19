// Parent record sys_id (change as needed)
var parentSysId = 'd2cdb552db252200a6a2b31be0b8f5ee'; 

// Dummy user display name (must exist in sys_user table)
var dummyApproverName = 'Dummy'; 

// Step 1: Find the existing approval for the parent record
var approvalGR = new GlideRecord('sysapproval_approver');
approvalGR.addQuery('sysapproval', parentSysId);
approvalGR.query();

if (approvalGR.next()) {
    // Step 2: Mark current approval as not required
    approvalGR.state = 'No Longer Required';
    approvalGR.update();
    gs.info('Existing approval marked as not required for record: ' + parentSysId);

    // Step 3: Find the dummy user in sys_user
    var userGR = new GlideRecord('sys_user');
    if (userGR.get('name', dummyApproverName)) { // exact match of Name field
        // Step 4: Create a new approval for the dummy user
        var newApproval = new GlideRecord('sysapproval_approver');
        newApproval.initialize();
        newApproval.sysapproval = parentSysId;
        newApproval.approver = userGR.sys_id;
        newApproval.state = 'requested';
        newApproval.insert();

        gs.info('New approval assigned to ' + dummyApproverName + ' for record: ' + parentSysId);
    } else {
        gs.warn('Dummy user not found: ' + dummyApproverName);
    }

} else {
    gs.warn('No approval record found for parent record sys_id: ' + parentSysId);
}
