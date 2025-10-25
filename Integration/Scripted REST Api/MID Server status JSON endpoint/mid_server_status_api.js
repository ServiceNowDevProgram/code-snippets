// Scripted REST API Resource Script: MID Server status JSON endpoint
// Method: GET
// Path: /mid/status

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
  try {
    // Configurable staleness threshold in minutes via query param
    var q = request.queryParams || {};
    var minutesStale = parseInt((q.minutes_stale && q.minutes_stale[0]) || '15', 10);
    if (!isFinite(minutesStale) || minutesStale <= 0) minutesStale = 15;

    var now = new GlideDateTime();

    var out = [];
    var gr = new GlideRecord('ecc_agent'); // MID Server table
    gr.addActiveQuery();
    gr.orderBy('name');
    gr.query();

    while (gr.next()) {
      var updated = String(gr.getValue('sys_updated_on') || '');
      var minutesSince = 0;
      if (updated) {
        // gs.dateDiff returns seconds when third arg is true
        minutesSince = Math.floor(gs.dateDiff(updated, now.getValue(), true) / 60);
      }

      out.push({
        sys_id: gr.getUniqueValue(),
        name: gr.getDisplayValue('name') || gr.getValue('name'),
        status: gr.getDisplayValue('status') || gr.getValue('status'), // Up, Down, etc.
        sys_updated_on: gr.getDisplayValue('sys_updated_on'),
        minutes_since_update: minutesSince,
        stale: minutesSince >= minutesStale
      });
    }

    response.setStatus(200);
    response.setBody(out);
  } catch (e) {
    response.setStatus(500);
    response.setBody({ error: String(e) });
  }
})(request, response);
