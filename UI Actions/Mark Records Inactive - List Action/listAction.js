// Create a List Action. Make it as List Banner Button or List choice. Keep the client checkbox checked and the use the below script.

var selRecords;

function markInactive() {
    selRecords = g_list.getChecked(); //Get the sysIds of selected records from list view

    var ga_inactive = new GlideAjax('MarkRecordsInactive'); // call the script include for the same

    ga_inactive.addParam('sysparm_name', 'markInactiveRecords');
    ga_inactive.addParam('sysparm_ids', selRecords);
    ga_inactive.addParam('sysparm_table', g_list.getTableName());

    ga_inactive.getXML(ResponseFunction);

    function ResponseFunction(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        alert(answer.toString());
    }
}
