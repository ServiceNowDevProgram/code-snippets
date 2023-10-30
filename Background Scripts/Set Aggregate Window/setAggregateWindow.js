//Prints the count of each category for the first ten records in the Incident [incident] table.

var ga = new GlideAggregate('incident');
ga.addAggregate('COUNT', 'category');
ga.setAggregateWindow(0, 10);
ga.query();
while (ga.next()) {
   var incidentCount = ga.getAggregate('COUNT', 'category');
   gs.info('{0} count: {1}', [ga.getValue('category'), incidentCount]);
}
