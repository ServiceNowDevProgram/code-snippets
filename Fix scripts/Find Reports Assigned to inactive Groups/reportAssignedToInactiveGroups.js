var report = new GlideRecord("sys_report_users_groups");
report.addEncodedQuery('group_id.active=false');
report.query();
while (report.next())
{
	gs.print("record found: "+report.sys_id);
	report.group_id = "";	
	report.setWorkflow(false);
	report.autoSysFields(false);
	report.update();
}
ignore = 'true';
