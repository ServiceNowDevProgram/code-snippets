(function executeRule(current, previous /*null when async*/) {
	
	var table = current.name;
	var el = current.element;
	
	var scs = new GlideRecord('sys_choice_set');
	scs.addQuery('name', table);
	scs.addQuery('element', el);
	scs.query();
	
	if (scs.next()) {
		return;
	}
	
	scs.initialize();
	scs.name = table;
	scs.element = el;
	scs.insert();
	
})(current, previous);