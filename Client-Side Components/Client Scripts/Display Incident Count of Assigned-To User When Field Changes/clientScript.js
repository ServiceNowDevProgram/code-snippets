function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') return;

    // Clear any previous messages
    g_form.clearMessages();

    // Create GlideAjax object to call the Script Include
    var ga = new GlideAjax('IncidentAssignmentCheck');
    ga.addParam('sysparm_name', 'getIncidentCount');
    ga.addParam('sysparm_user', newValue);

    
    ga.getXMLAnswer(function(response) {
        var count = parseInt(response, 10);

        
        if (isNaN(count)) {
            g_form.addErrorMessage("Could not retrieve open incident count.");
            return;
        }

        var userName = g_form.getDisplayValue('assigned_to');
        var msg = userName + " currently has " + count + " incidents assigned ";

        if (count >= 5) {
            g_form.addInfoMessage(msg + " Please review workload before assigning more incidents");
        } else {
            g_form.addInfoMessage(msg);
        }
    });
}
