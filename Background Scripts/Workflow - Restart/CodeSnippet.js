
var gr = new GlideRecord("<table_name>");
gr.addQuery("sys_id", "<record_sys_id>");
gr.query();
if (gr.next()) {
new Workflow().restartWorkflow(gr);

}
