/*
This script should be placed in the UI action on the table sysapproval_approver.
This UI action should be marked as client callable script include.
Use openContextRecord() function in the Onclick field.
*/

function openContextRecord() {
    var rec = g_form.getDisplayValue("document_id");
    var gaSi = new GlideAjax("TestScriptInclude");
    gaSi.addParam("sysparm_name", "getDocumentClass");
    gaSi.addParam("sysparm_sys_id", g_form.getUniqueValue());
    gaSi.getXMLAnswer(function(response) {
        var answer = JSON.parse(response);
        var gp = new GlideModalForm(answer.title, answer.table, function(){});
        gp.addParm('sys_id', answer.document);
        gp.render();
    });
}