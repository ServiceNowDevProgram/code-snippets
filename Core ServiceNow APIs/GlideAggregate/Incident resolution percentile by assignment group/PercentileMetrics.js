// Script Include: PercentileMetrics
// Purpose: Compute percentile resolution times by group using nearest-rank selection.
// Scope: global or scoped. Client callable false.

var PercentileMetrics = Class.create();
PercentileMetrics.prototype = {
  initialize: function() {},

  /**
   * Compute percentiles for incident resolution times by group.
   * @param {Object} options
   *   - windowDays {Number} lookback window (default 30)
   *   - groupField {String} field to group by (default 'assignment_group')
   *   - percentiles {Array<Number>} e.g. [0.5, 0.9]
   *   - table {String} table name (default 'incident')
   * @returns {Array<Object>} [{ group: <sys_id>, count: N, avgMins: X, p: { '0.5': v, '0.9': v } }]
   */
  resolutionPercentiles: function(options) {
    var opts = options || {};
    var table = opts.table || 'incident';
    var groupField = opts.groupField || 'assignment_group';
    var windowDays = Number(opts.windowDays || 30);
    var pct = Array.isArray(opts.percentiles) && opts.percentiles.length ? opts.percentiles : [0.5, 0.9];

    // Build date cutoff for resolved incidents
    var cutoff = new GlideDateTime();
    cutoff.addDaysUTC(-windowDays);

    // First pass: find candidate groups with counts and avg
    var ga = new GlideAggregate(table);
    ga.addQuery('resolved_at', '>=', cutoff);
    ga.addQuery('state', '>=', 6); // resolved/closed states
    ga.addAggregate('COUNT');
    ga.addAggregate('AVG', 'calendar_duration'); // average of resolution duration
    ga.groupBy(groupField);
    ga.query();

    var results = [];
    while (ga.next()) {
      var groupId = ga.getValue(groupField);
      var count = parseInt(ga.getAggregate('COUNT'), 10) || 0;
      if (!groupId || count === 0) continue;

      // Second pass: ordered sample to pick percentile ranks
      var ordered = new GlideRecord(table);
      ordered.addQuery('resolved_at', '>=', cutoff);
      ordered.addQuery('state', '>=', '6');
      ordered.addQuery(groupField, groupId);
      ordered.addNotNullQuery('closed_at');
      // Approx resolution minutes using dateDiff: closed_at - opened_at in minutes
      ordered.addQuery('opened_at', 'ISNOTEMPTY');
      ordered.addQuery('closed_at', 'ISNOTEMPTY');
      ordered.orderBy('closed_at'); // for stability
      ordered.query();

      var durations = [];
      while (ordered.next()) {
        var opened = String(ordered.getValue('opened_at'));
        var closed = String(ordered.getValue('closed_at'));
        var mins = gs.dateDiff(opened, closed, true) / 60; // seconds -> minutes
        durations.push(mins);
      }
      durations.sort(function(a, b) { return a - b; });

      var pvals = {};
      pct.forEach(function(p) {
        var rank = Math.max(1, Math.ceil(p * durations.length)); // nearest-rank
        pvals[String(p)] = durations.length ? Math.round(durations[rank - 1]) : 0;
      });

      results.push({
        group: groupId,
        count: count,
        avgMins: Math.round(parseFloat(ga.getAggregate('AVG', 'calendar_duration')) / 60),
        p: pvals
      });
    }
    return results;
  },

  type: 'PercentileMetrics'
};
