(function executeArchive() {
  var retentionDays = 90; // Change as needed
  var cutoffDate = new GlideDateTime();
  cutoffDate.addDaysUTC(-retentionDays);

  var gr = new GlideRecord('sc_request');
  gr.addQuery('sys_created_on', '<=', cutoffDate);
  gr.addQuery('active', false); // Only archive closed requests
  gr.query();

  while (gr.next()) {
    // Optional: Copy data to archive table
    var archive = new GlideRecord('x_your_scope_archived_requests');
    archive.initialize();
    archive.original_request = gr.number.toString();
    archive.archived_date = new GlideDateTime();
    archive.requester = gr.requested_for.toString();
    archive.status = gr.state.toString();
    archive.data_json = JSON.stringify(gr);
    archive.insert();

    // Mark original request as archived
    gr.u_archived = true; // Add custom field
    gr.update();
  }
})();
