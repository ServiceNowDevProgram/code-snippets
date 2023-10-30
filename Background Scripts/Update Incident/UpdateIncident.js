var gr = new GlideRecord('incident');
gr.addQuery('state', '1'); 
gr.query();
while (gr.next()) {
  gr.priority = '2'; 
  gr.update();
}
