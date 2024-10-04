function onSubmit() {
    var priority = g_form.getValue('priority');

    if (priority == '1') {
        // is already a Major Incident
        var gaCheck = new GlideAjax('CreateMajorIncident');
        gaCheck.addParam('sysparm_name', 'isAlreadyMajorIncident');
        gaCheck.addParam('sysparm_sysid', g_form.getUniqueValue());

        var response = gaCheck.getXMLWait();
        var isMajorIncident = response.documentElement.getAttribute('answer'); 
        
        // not yet a Major Incident
        if (isMajorIncident == 'false') {
            var resp = confirm(getMessage('Please confirm that you would like to propose a Major Incident Candidate?'));

            if (resp) {
                // propose the Major Incident
                var ga = new GlideAjax('CreateMajorIncident');
                ga.addParam('sysparm_name', 'majorIncCreate');
                ga.addParam('sysparm_sysid', g_form.getUniqueValue());

                var majorIncidentResponse = ga.getXMLWait(); 
                var incidentNumber = majorIncidentResponse.documentElement.getAttribute('answer');

                alert("Incident " + incidentNumber + " has been proposed as a Major Incident candidate.");
            } else {
                // cancels
                return false;
            }
        }
    }

    return true; // Allow if priority is not 1 or after processing
}
