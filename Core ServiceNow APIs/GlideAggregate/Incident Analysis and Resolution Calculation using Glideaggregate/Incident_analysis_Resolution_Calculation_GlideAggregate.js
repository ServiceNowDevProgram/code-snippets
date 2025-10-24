var ga = new GlideAggregate('incident');
ga.addQuery('state', '!=', 'Closed'); // Filter for open incidents only
ga.groupBy('assigned_to');
ga.addAggregate('COUNT', 'number');
ga.addAggregate('AVG', 'time_to_close');
ga.query();
while (ga.next()) {
  var assigned_to = ga.getDisplayValue('assigned_to');
  var count = ga.getAggregate('COUNT', 'number');
  var avgTimeToClose = ga.getAggregate('AVG', 'time_to_close');
  gs.info('Assigned to: ' + assigned_to + ', Incident Count: ' + count + ', Average Time to Close: ' + avgTimeToClose);
}
