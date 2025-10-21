// Background Script: example usage for PercentileMetrics
(function() {
  var util = new PercentileMetrics();
  var out = util.resolutionPercentiles({
    windowDays: 30,
    groupField: 'assignment_group',
    percentiles: [0.5, 0.9, 0.95]
  });

  out.forEach(function(r) {
    gs.info('Group=' + r.group + ' count=' + r.count + ' avg=' + r.avgMins + 'm P50=' + r.p['0.5'] + 'm P90=' + r.p['0.9'] + 'm P95=' + r.p['0.95'] + 'm');
  });
})();
