(function executeRule(current, previous /*null when async*/) {

	// Add your code here

	var updateSetSysId = current.sys_id; // Get the sys_id of the current update set
	var updateSetScope = current.application; // Get the scope of the current update set
	var gr = new GlideRecord('sys_update_xml');
	gr.addQuery('update_set', updateSetSysId); // Query for records in the current update set
	gr.query();

	var misMatchedUpdates = [];
	while (gr.next()) {
		if (gr.application != updateSetScope) { // Check if the scope matches the update set scope
			misMatchedUpdates.push( gr.target_name.toString() + ' (' + gr.type.toString() + ')'); // Collect the file names with mismatched scope
		}
	}

	if (misMatchedUpdates.length > 0) {
		gs.addErrorMessage('The following files have a different scope than the update set scope: \n' + misMatchedUpdates.join(', '));
		current.setAbortAction(true); // Prevent the update set from being completed
	}

	

})(current, previous);