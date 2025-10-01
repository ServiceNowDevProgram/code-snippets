//Find existing Copy Table Name menu item and remove it
var gr = new GlideRecord('sys_ui_context_menu');
gr.addEncodedQuery('name=Copy Table Name^order=9876');
gr.query();
var found = false;
while (gr.next()) {
  found = true;
  gr.deleteRecord();
  gs.info('The menu item was removed');
}
if (!found) {
  gs.info('No Action: The menu item was not found.');
}
