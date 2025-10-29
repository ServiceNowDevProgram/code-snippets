var now = new GlideDateTime();
var gr = new GlideRecord('x_snc_scheduled_requests');
gr.addQuery('scheduled_time', '<=', now);
gr.query();

while (gr.next()) {
  var request = new GlideRecord('sc_request');
  request.initialize();
  request.requested_for = gr.requested_for;
  request.cat_item = gr.catalog_item;
  request.insert();

  gr.deleteRecord(); // Remove after submission
}
