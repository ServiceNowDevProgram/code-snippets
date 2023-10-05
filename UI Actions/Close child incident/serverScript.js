var gr = new GlideRecord('incident');
gr.addQuery('parent_incident',current.sys_id); //querying over particular parent incident
gr.query();
while(gr.next()){
	gr.state = '7'; //updating the state of the child incident to closed
	gr.update();
}
