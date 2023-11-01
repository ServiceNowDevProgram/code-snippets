var inc = new GlideRecord('incident');
inc.addEncodedQuery("parent_incident=9c573169c611228700193229fff72400"); // sys_id of parent Incident
inc.query();

gs.info("List of Child Incidents of INC0000001:");

while(inc.next())
{
	gs.info(inc.getValue('number'));
}
