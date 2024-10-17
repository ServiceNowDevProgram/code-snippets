var ga = new GlideAggregate('incident');
ga.addQuery('state', '!=', 'Closed'); // Filter for open incidents only
ga.groupBy('assigned_to');
ga.addAggregate('COUNT', 'number');
ga.addAggregate('AVG', 'time_to_close');
ga.query();
while (ga.next()) {
  var assigned_to = ga.get('assigned_to');
  var count = ga.get('result');
  var avgTimeToClose = ga.get('result.avg_time_to_close');
  gs.info('Assigned to: ' + assigned_to + ', Incident Count: ' + count + ', Average Time to Close: ' + avgTimeToClose);
}
