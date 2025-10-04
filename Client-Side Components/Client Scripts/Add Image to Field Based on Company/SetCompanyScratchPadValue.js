(function executeRule(current, previous /*null when async*/) {

	// Set the Scratchpad value for Company which would be used in the Client Script
	g_scratchpad.company = current.request.requested_for.company.getDisplayValue();

})(current, previous);
