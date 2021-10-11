(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var gr = new GlideRecord('problem');
// 	gr.initialize();
	gr.addQuery('sys_id', current.problem_id);
	gr.query();
	if(gr.next())
		{
			gr.u_associated_incidents += 1;
			
		}
	gr.update();
	
})(current, previous);
