var ar = [];
var dupCheck = new GlideAggregate('sys_report');
dupCheck.addEncodedQuery('titleISNOTEMPTY');
dupCheck.addNotNullQuery('title');
dupCheck.groupBy('title');
dupCheck.addAggregate('COUNT', 'title');
dupCheck.addHaving('COUNT', '>', 1);
dupCheck.query();
while (dupCheck.next()) {
ar.push(dupCheck.getValue("title"));
}

for(var i = 0 ; i< ar.length; i++){
	var report = new GlideRecord("sys_report");
	report.addQuery("title",ar[i]);
	report.query();
var c= 0;
	while(report.next()){
		c++;
		var user = new GlideRecord("sys_user");
		user.addQuery("email",report.sys_created_by.toString());
		user.query();
		if(user.next()){
			var name = user.name;
		}
		
		if(name){
		report.title = report.title+" "+' - [' + name + ']'+" "+"v"+c; // Report named ABC will now be ABC - [PQR]v1 and ABC - [XYZ]v2 where PQR and XYZ are created by users 
		report.setWorkflow(false);
		report.autoSysFields(false);
		report.update();
		}
		else {
			report.title = report.title+" "+"v"+c;
			report.setWorkflow(false);
			report.autoSysFields(false);
			report.update();
			
		}
	}
	
}
