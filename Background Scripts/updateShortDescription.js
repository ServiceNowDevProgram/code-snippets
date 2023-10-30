
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
  gr.short_description = 'Updated short description';
  gr.update();
}
