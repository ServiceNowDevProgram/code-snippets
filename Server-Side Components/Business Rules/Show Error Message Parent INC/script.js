//Table: Incident
//When To Run: Before update
//Condition: State changes to Resolved
var inc = new GlideRecord('incident');
	inc.addQuery('parent_incident',current.sys_id);
	inc.addEncodedQuery('active=true^stateIN1,2,3');
	inc.query();
	if(inc.getRowCount() != 0){
		gs.addErrorMessage('Resolve the child incident(s) before resovling the parent incident');
		current.setAbortAction(true);
	}
