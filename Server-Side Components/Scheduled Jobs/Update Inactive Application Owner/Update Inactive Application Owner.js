var grApp = new GlideRecord("cmdb_ci_appl");
grApp.addEncodedQuery("owned_by.active=false");
grApp.query();
while(grApp.next()){
var managerSysId = grApp.owned_by.manager.toString(); // Get Manager SysId     
if (managerSysId) {
grApp.owned_by = managerSysId;
grApp.update();
}
}
