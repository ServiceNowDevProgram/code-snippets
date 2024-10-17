/*This BR is created basically to close the parent requested item when ever the sc task is closed 
1. When: After
2. Update: true
3. Add filter condition as 
    1. State is one of closed complete or closed incomplete
    2. Catalog Item needs to be selected
4. Advanced check box needs to be checked*/

(function executeRule(current, previous /*null when async*/) {
	var gr = new GlideRecord('sc_task'); //Pointing towards SC Task table
	gr.addQuery('request_item', current.request_item); //Add query to get parent ritm
	gr.addQuery('active', true); //Add query for active records
	gr.query();
	if(!gr.next()){
		var ritm = current.request_item.getRefRecord(); 
		ritm.state = 3; //Set state to closed incomplete or closed complete
		ritm.update();
	}
})(current, previous);
