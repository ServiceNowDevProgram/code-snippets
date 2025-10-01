var ritm = new GlideRecord('sc_req_item');
var enc = '';
ritm.addEncodedQuery(enc);
ritm.query();
while (ritm.next()){
	ritm.state = '1';
	ritm.approval = 'requested';
	ritm.setWorkflow(false);
	ritm.autoSysFields(false);
	ritm.update();

	// Execute the global flow called test_flow 
	sn_flow_trigger.FlowTriggerAPI.fireCatalogTrigger('flow_name', ritm);

}
