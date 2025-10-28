var incGr = new GlideRecord('incident');
incGr.addActiveQuery();
incGr.addEncodedQuery("sys_created_onRELATIVELT@year@ago@1"); //Created 1 year ago. Update query as required.
incGr.query();
while(incGr.next())
{
	incGr.state = 6;
	incGr.close_code = 'No resolution provided'; 
	incGr.close_notes = 'Bulk Closing Old Incidents';
	incGr.update();
}
