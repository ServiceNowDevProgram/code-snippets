var inc = new GlideAggregate('incident');
inc.addEncodedQuery('parent_incidentISNOTEMPTY'); // This encoded query can be modified to more condition based on requirement.
inc.groupBy('parent_incident');
inc.addAggregate('COUNT');
inc.query();


while(inc.next())
{
	gs.info('Number of Child Incident of '+ inc.getDisplayValue('parent_incident')+ ' are ' +inc.getAggregate('COUNT')+ '.');
}
