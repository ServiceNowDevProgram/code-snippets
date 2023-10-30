function createIncidentTask() {
	
	var sysID = g_form.getUniqueValue();
	
	var gm = new GlideModalForm('Create Incident Task', 'incident_task');
	gm.setPreference('focusTrap', true);
	gm.setPreference('table', 'incident_task');
	gm.setPreference('sysparm_query', 'incident='+sysID);
	gm.setWidth(650);

	//Opens the dialog
	gm.render();
	
}
