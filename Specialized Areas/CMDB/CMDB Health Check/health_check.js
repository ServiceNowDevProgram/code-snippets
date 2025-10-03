var ga = new GlideAggregate('cmdb_ci_appl');
ga.addQuery('operational_status', 2); // Non-operational
ga.addQuery('install_status', 1); // Installed
ga.addAggregate('COUNT');
ga.query();
var total = 0;
if (ga.next()) {
    total = ga.getAggregate('COUNT');
}
gs.info('Application CIs installed but not in operational count: ' + total);
