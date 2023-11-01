var inc = new GlideRecord('incident');
inc.addEncodedQuery(query); // You can add your filter query to check it for particular list of Incidents like Department wise, Last created on 30 days, etc.
inc.setLimit(x); // If you want you can limit the records to some extend to avoid performance issues.
inc.query();

while(inc.next())
{
	var childInc = new GlideRecord('incident');
	childInc.addQuery('parent_incident',inc.getUniqueValue());
	childInc.query();

if(childInc.hasNext()) {
	gs.info("Number of Child Incident of "+inc.number + " are " +childInc.getRowCount()+ ". List of Child Incident numbers are as below:");
}
	while(childInc.next())
	{
		gs.info(childInc.getValue('number'));

	}
}
