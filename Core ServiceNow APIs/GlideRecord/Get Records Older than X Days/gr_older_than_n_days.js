// Background Script or Script Include method
(function() {
  var TABLE = 'incident';   // table to query
  var FIELD = 'opened_at';  // date-time field to compare
  var DAYS = 30;            // older than N days

  var gdt = new GlideDateTime();
  gdt.addDaysUTC(-DAYS);    // move back N days in UTC

  var gr = new GlideRecord(TABLE);
  gr.addQuery(FIELD, '<=', gdt.getValue());  // index-friendly comparison
  gr.addActiveQuery();                        // example extra filter
  gr.setLimit(200);                           // sample to avoid huge output
  gr.query();

  var count = 0;
  while (gr.next()) {
    count++;
    // do work or collect ids
    // gs.info(gr.getUniqueValue() + ' | ' + gr.getDisplayValue(FIELD));
  }

  gs.info(TABLE + ' older than ' + DAYS + ' days: ' + count);
})();
