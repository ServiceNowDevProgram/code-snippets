(function executeRule(current, previous /*null when async*/) {
	var util = new global.UpdateSetUtilCustom();
	if (util.checkForScopeConflict(current)) {
		current.setAbortAction(true);
		gs.addErrorMessage('This update set has a scope conflict in it. Please click the "Fix Updates Scope" button to fix.');
		action.setRedirectURL(current);
	}
})(current, previous);
