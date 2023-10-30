var gr = new GlideRecord('incident');
gr.addQuery('state', '7'); 
gr.query();
var count = 0;
while (gr.next()) {
  gr.deleteRecord();
  count++;
}
