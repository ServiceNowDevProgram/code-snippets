(function executeRule(current, previous /*null when async*/ ) {

	/* 
	 * All of the below variables will be avialable in the client script
	 * under the g_scratchpad variable for use.
	 */
    g_scratchpad.css = gs.getProperty('css.base.color');
    g_scratchpad.hasAttachments = current.hasAttachments();
    g_scratchpad.managerName = current.caller_id.manager.getDisplayValue();

})(current, previous);