var gr=new GlideRecord('<table_name>');
gr.addQuery('<query condition>');
gr.query();
while(gr.next()){
// Prevent system fields from being updated
  gr.autoSysFields(false);
// Disable business rules and workflows
  gr.setWorkflow(false);
// Update fields as needed
  gr.setValue('<field backend name>', '<value to be set>');
  gr.setValue('<reference field backend name>', '<value to be set>');
  gr.update();
}