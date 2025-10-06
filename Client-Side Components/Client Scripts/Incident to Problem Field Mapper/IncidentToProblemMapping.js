//Client script to map the fields in problem
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	
   if (newValue === '') {
	return;
   }

   var ga = new GlideAjax('IncidentDetails');
    ga.addParam('sysparm_name', 'getIncidentDetails');
    ga.addParam('sysparm_incidentSysId', newValue);
    ga.getXMLAnswer(function(response) {
        var result = JSON.parse(response);

        g_form.setValue('cmdb_ci', result.cmdb_ci);
        g_form.setValue('priority', result.priority);
        g_form.setValue('assignment_group', result.assignment_group);
		g_form.setValue('short_description', result.short_description);
		g_form.setValue('description', result.description);
    });   
   
}
