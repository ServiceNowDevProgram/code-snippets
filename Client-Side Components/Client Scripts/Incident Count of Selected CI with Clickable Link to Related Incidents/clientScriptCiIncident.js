function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') return;

    g_form.clearMessages();

    // Call Script Include to count incidents by CI
    var ga = new GlideAjax('ConfigurationIncidentCheck');
    ga.addParam('sysparm_name', 'getIncidentCount');
    ga.addParam('sysparm_ci', newValue);

    ga.getXMLAnswer(function(response) {
        var count = parseInt(response, 10);
        if (isNaN(count)) {
            g_form.addErrorMessage("Could not retrieve incident count for this CI.");
            return;
        }

        var ciName = g_form.getDisplayValue('cmdb_ci');
        var url = '/incident_list.do?sysparm_query=cmdb_ci=' + newValue + '^stateNOT IN6,7,8';
        var msg = 'Configuration Item <b>' + ciName + '</b> has <a target="_blank" href="' + url + '"><b>' + count + '</b> related incident(s)</a>.';

       if (count === 0) {
    g_form.addInfoMessage(
        'Configuration Item <b>' + ciName + '</b> has no incidents associated with it.'
    );
} else {
    if (count >= 5) {
        g_form.addWarningMessage(
            msg + ' consider Problem investigation.'
        );
    } else {
        g_form.addInfoMessage(msg);
    }
}
    });
}
