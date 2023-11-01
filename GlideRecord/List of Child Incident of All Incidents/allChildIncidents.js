var inc = new GlideRecord('incident');
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
