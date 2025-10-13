var grReport = new GlideRecord('sys_report_users_groups');
grReport.getEncodedQuery('user_id.nameLIKEJaspal');//replace the query correctly for the reports that requires ownership change
grReport.query();
while (grReport.next()) {
    grReport.user_id = "20db787ec374bd58265fdf3c05011234"; //replace sys_id with relevant sys_id of the user who will have the ownership updated to
    grReport.autoSysFields(false);
    grReport.update();
}
