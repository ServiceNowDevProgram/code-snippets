// UI Action: Generate PDF
// Table: Incident 
// Condition: current.state=='6' //Resolved
// Onclick: generatePDF();
// sysparm_view = pdf_export 
function generatePDF() {

    var url = '/'+g_form.getTableName() + '.do?sys_id=' + g_form.getUniqueValue() + '&PDF&sysparm_view=pdf_export';
    top.window.open(url, '_blank');
}
