(function executeRule(current, previous) {

	
	var gr = new GlideRecord('problem');
	gr.addQuery('sys_id', current.problem_id);
	gr.query();
	if(gr.next())
		{
			gr.u_associated_incidents += 1;
			gr.update();
			
		}
	
	
})(current, previous);
