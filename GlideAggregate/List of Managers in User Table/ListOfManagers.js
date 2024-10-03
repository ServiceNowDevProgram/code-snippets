
var mngrs = [];
var usr = new GlideAggregate('sys_user');
usr.addEncodedQuery("managerISNOTEMPTY"); // If you want this based on other condition also like Depenartment, Service Line, etc, you can add it on Query accordingly
usr.groupBy('manager');
usr.query();

while(usr.next())
{
	mngrs.push(usr.manager.getDisplayValue());

}
gs.info("Please find the list Managers - " + mngrs);
