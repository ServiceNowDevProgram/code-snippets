var grAppr = new GlideRecord("sysapproval_approver");
grAppr.addEncodedQuery("sys_created_on<javascript:gs.beginningOfLast12Months()^state=requested");
grAppr.query();
while(grAppr.next()){
	grAppr.setValue('state', 'rejected');
	grAppr.update();
}
