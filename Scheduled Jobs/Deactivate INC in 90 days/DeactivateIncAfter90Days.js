var grInc = new GlideRecord("incident");
grInc.addEncodedQuery("sys_created_on<javascript:gs.beginningOfLast90Days()");
grInc.query();
while(grInc.next()){
	grInc.setValue('active', false);
	grInc.update();
}
