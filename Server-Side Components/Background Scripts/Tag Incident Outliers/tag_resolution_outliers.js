// Background Script: Tag incident resolution outliers by z score
(function() {
  var TABLE = 'incident';
  var DAYS = 30;
  var Z_THRESHOLD = 2.5;
  var FLAG_FIELD = 'u_outlier'; // create this boolean field or change action to add work_notes - potential to change to tag as well if one exists

  // Build look-back cutoff
  var cutoff = new GlideDateTime();
  cutoff.addDaysUTC(-DAYS);

  // First pass: mean and std dev of resolution minutes
  // Compute duration per record as closed_at - opened_at in minutes
  var minutes = [];
  var gr = new GlideRecord(TABLE);
  gr.addQuery('closed_at', '>=', cutoff);
  gr.addQuery('state', '>=', 6); // resolved or closed
  gr.addNotNullQuery('opened_at');
  gr.addNotNullQuery('closed_at');
  gr.query();
  while (gr.next()) {
    var opened = String(gr.getValue('opened_at'));
    var closed = String(gr.getValue('closed_at'));
    var mins = gs.dateDiff(opened, closed, true) / 60;
    minutes.push({ id: gr.getUniqueValue(), mins: mins });
  }
  if (!minutes.length) {
    gs.info('No records in window. Exiting.');
    return;
  }

  var sum = minutes.reduce(function(a, x) { return a + x.mins; }, 0);
  var mean = sum / minutes.length;

  var variance = minutes.reduce(function(a, x) {
    var d = x.mins - mean; return a + d * d;
  }, 0) / minutes.length;
  var std = Math.sqrt(variance);

  // Second pass: tag outliers
  var tagged = 0;
  minutes.forEach(function(row) {
    var z = std > 0 ? (row.mins - mean) / std : 0;
    if (z >= Z_THRESHOLD) {
      var r = new GlideRecord(TABLE);
      if (r.get(row.id)) {
        if (r.isValidField(FLAG_FIELD)) {
          r[FLAG_FIELD] = true;
          r.update();
        } else {
          r.work_notes = 'Marked outlier by automation. z=' + z.toFixed(2) + ', mean=' + Math.round(mean) + 'm, std=' + Math.round(std) + 'm';
          r.update();
        }
        tagged++;
      }
    }
  });

  gs.info('Outlier tagging complete. Window=' + DAYS + 'd, N=' + minutes.length + ', mean=' + Math.round(mean) + 'm, std=' + Math.round(std) + 'm, tagged=' + tagged);
})();
