(function executeRule(current, previous /*null when async*/) {
	
	var sessionData = gs.getSession().getCurrentDomainID().toString();
	
	//set the scratchpad value to the domain of current user session
	var cd = new GlideRecord('domain');
	cd.get(sessionData);
	if (cd.name.nil()) {
		g_scratchpad.currentDomain = 'Global';
	} else {
		g_scratchpad.currentDomain = cd.sys_domain.getDisplayValue();
	}
	
	//set the scratchpad value to the domain of the record it's called from
	g_scratchpad.recordDomain = current.sys_domain.getDisplayValue();
	
})(current, previous);
