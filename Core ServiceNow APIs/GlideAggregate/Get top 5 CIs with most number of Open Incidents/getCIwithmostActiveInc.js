var countOfCI = 5;
var inc = new GlideAggregate('incident');
inc.addActiveQuery();
inc.addAggregate('COUNT', 'cmdb_ci');
inc.groupBy('cmdb_ci');
inc.orderByAggregate('COUNT', 'cmdb_ci');
inc.setLimit(countOfCI);
inc.query();
gs.info('---Top ' + countOfCI + ' CIs with Most Open Incidents---');


while (inc.next()) {
    var ciName;
    var ciSysID = inc.cmdb_ci;
    var count = inc.getAggregate('COUNT', 'cmdb_ci');
    var ci = new GlideRecord('cmdb_ci');
    if (ci.get(ciSysID)) {                  //retrieving the CI record
        ciName = ci.name.toString();
    } else {
        ciName = 'Invalid CI';
    }

    gs.info('. CI: ' + ciName + ' | Count of Inc: ' + count);
}
