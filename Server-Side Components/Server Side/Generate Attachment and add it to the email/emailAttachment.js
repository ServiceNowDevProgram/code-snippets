(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    var Headers = ["Number", "Caller", "Short Desc", "Assignment Group", "Assigned To"];
    var currentDate = new GlideDateTime();
    var fileName = 'Incidents' + '.csv';
    var csvData = ''; //The variable csvData will contain a string which is used to build the CSV file contents
    for (var i = 0; i < Headers.length; i++) { //Build the Headers
        csvData = csvData + '"' + Headers[i] + '"' + ',';
    }
    csvData = csvData + "\r\n";

    var gr = new GlideRecord("incident");
    gr.addActiveQuery();
    gr.query();
    while (gr.next()) {
        csvData = csvData + '"' + gr.number + '",' + '"' + gr.caller_id.getDisplayValue() + '",' + '"' + gr.short_description + '",' + '"' + gr.assignment_group.getDisplayValue() + '",' + '"' + gr.assigned_to.getDisplayValue() + '"';
        csvData = csvData + "\r\n";
    }

    var grAttachment = new GlideSysAttachment();
    grAttachment.write(event, fileName, 'application/csv', csvData);

})(current, template, email, email_action, event);
