// UI Action: Generate PDF
// Table: Incident 
// Condition: current.state=='6' //Resolved
// Client true
// sysparm_view = pdf_export 
function onClick(g_form) {
    var url = '/'+g_form.getTableName() + '.do?sys_id=' + g_form.getUniqueValue() + '&PDF&sysparm_view=pdf_export';
    top.window.open(url, '_blank');
}
