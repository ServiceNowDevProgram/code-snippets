(function() {
  data.userID = gs.getUserID();
  data.assets = [];

  var gr = new GlideRecordSecure('alm_asset');
  gr.addQuery('assigned_to', gs.getUserID());
  gr.orderBy('display_name');
  gr.query();

  data.recordCount = gr.getRowCount();

  while (gr.next()) {
    data.assets.push({
      display: gr.getDisplayValue('display_name'),
      assigned_to: gr.getDisplayValue('assigned_to'),
      sysid: gr.getUniqueValue()
    });
  }
})();
