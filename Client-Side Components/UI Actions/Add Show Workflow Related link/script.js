// -----------------------------
// Open workflow in a new window
// -----------------------------
function showWorkflow() {
    var url = new GlideURL('/context_workflow.do');
    url.addParam('sysparm_stack', 'no');
    url.addParam('sysparm_document', g_form.getUniqueValue());
	url.addParam('sysparm_table', g_form.getTableName());
	g_navigation.open(url.getURL(), "_blank");
}
