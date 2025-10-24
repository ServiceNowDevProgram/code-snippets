var ritmSysId = '443c2b1f1b95f15036d94268b04bcbe9'; // Enter the RITM sys_id

var grScReqItem = new GlideRecord('sc_req_item');
grScReqItem.addEncodedQuery("sys_id=" + ritmSysId);// sys_id of the RITM
grScReqItem.setLimit(1);
grScReqItem.query();

if (grScReqItem.next()) {
try {
	gs.info("Restarting flow for " + grScReqItem.number);
	var flow = grScReqItem.cat_item.flow_designer_flow;
	var flowName = flow.sys_scope.scope + "." + flow.internal_name;
    	var inputs = {};
    	inputs['request_item'] = grScReqItem; // GlideRecord of table: sc_req_item
    	inputs['table_name'] = 'sc_req_item';

    	var contextId = sn_fd.FlowAPI.startFlow(flowName, inputs);	
	
  } catch (ex) {
    var message = ex.getMessage();
    gs.error("Error restarting flow for " + grScReqItem.number + "\n\n" + message);  
  }
}
