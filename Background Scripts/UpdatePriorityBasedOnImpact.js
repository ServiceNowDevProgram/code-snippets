
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.addQuery('impact', '2'); 
gr.query();
while (gr.next()) {
  
  if (gr.impact == '2') {
    gr.priority = '1'; 
  } else {
    gr.priority = '2'; 
  }
  gr.update();
}

