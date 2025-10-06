

// GlideRecord Example - Query Active Incidents
(function() {
  var gr = new GlideRecord('incident');
  gr.addQuery('active', true);
  gr.orderByDesc('sys_created_on');
  gr.setLimit(10);
  gr.query();

  while (gr.next()) {
    gs.info('Number: ' + gr.getValue('number') +
            ', Short Description: ' + gr.getValue('short_description') +
            ', Assigned To: ' + gr.getDisplayValue('assigned_to'));
  }
})();
