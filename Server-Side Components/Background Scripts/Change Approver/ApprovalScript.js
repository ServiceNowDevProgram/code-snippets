var approval = new GlideRecord('sysapproval_approver');
approval.addQuery('sysapproval', 'd2cdb552db252200a6a2b31be0b8f5ee');
approval.query();

if (approval.next()) {
    // Set the new approver using the display name
    approval.approver.setDisplayValue('Beth Anglin');
    approval.update();

    gs.info('Approver successfully updated to Beth Anglin for record: ' + approval.sysapproval);
} else {
    gs.warn('No approval record found for sys_id: d2cdb552db252200a6a2b31be0b8f5ee');
}
