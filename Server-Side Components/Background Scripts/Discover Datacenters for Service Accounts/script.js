var g = new GlideRecord('cmdb_ci_cloud_service_account');
g.query();
gs.info('Record Count ' + g.getRowCount());

while (g.next()) {
    var scheduleConfig = new global.CloudDiscoveryScheduleConfig();
    var accountSysId = g.sys_id + '';
    var result = {};
    gs.info("Discovering datacenters for: " + g.name + " " + accountSysId);
    try {
        result = scheduleConfig.discoverDatacenters(accountSysId);
        gs.info("Result: Success");
    } catch(err) {
        result.error = err;
    }
 
    if (result.error){
        gs.addErrorMessage(result.error);
    }
}