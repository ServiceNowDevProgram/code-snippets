var gr = new GlideRecord('sys_user');
gr.addEncodedQuery("last_login_timeBETWEENjavascript:gs.beginningOfToday()@javascript:gs.endOfThisWeek()");
gr.query();
while(gr.next()){
	gs.print("Username = " + gr.getValue("name"))
}
