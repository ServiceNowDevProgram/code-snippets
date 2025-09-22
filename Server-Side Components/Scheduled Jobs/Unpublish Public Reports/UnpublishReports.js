var pubReport = new GlideRecord('sys_report');
pubReport.addQuery('is_published=true^ORroles=public');
pubReport.query();
while(pubReport.next()) {
    //Obtain current roles report is shared with
	var removePublic = pubReport.roles;
    //Remove public role from string
	removePublic = removePublic.replace(/public/g, '');
    //Set report roles to new string value. Wihtout public role, report will auto unpublish
	pubReport.roles.setValue(removePublic);
	pubReport.update();
}
