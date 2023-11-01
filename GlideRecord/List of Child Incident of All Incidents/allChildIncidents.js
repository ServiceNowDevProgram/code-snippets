var inc = new GlideAggregate('incident');
inc.addEncodedQuery('parent_incidentISNOTEMPTY');
inc.groupBy('parent_incident');
inc.addAggregate('COUNT');
inc.query();

//gs.info("List of Child Incidents of INC0000001:");

while(inc.next())
{
	gs.info("Number of Child Incident of "+ inc.getDisplayValue('parent_incident')+ " are " +inc.getAggregate('COUNT')+ ".");
}

