//List of plugins to install
var plugins = ['com.snc.sdlc.agile.2.0.atf', 'com.snc.change_management.atf', 'com.snc.cmdb.atf', 'com.snc.incident.atf', 'com.snc.financial_planning_pmo.atf', 'com.snc.problem.atf', 'com.glideapp.servicecatalog.atf.test', ' com.snc.sla.atf', 'com.snc.test_management.2.0.atf'];

//Other ATF plugins that are not installed but here for reference if we want to easily add them in the future
var not_installed = ['com.sn_cim_atf', ' com.snc.innovation_management.atf', 'com.snc.investment_planning.atf', 'com.snc.sdlc.scrum_program.atf'];


var now_GR = new GlideRecord('sys_plugins');
now_GR.addQuery('source', 'IN', plugins);
now_GR.query();


var pMgr = new GlidePluginManager();

while (now_GR.next()) {
    var pName = now_GR.getValue('name');
    var pID = now_GR.getValue('source');
    var isActive = pMgr.isActive(pID);

    //ensure the plugin is active before loading Demo Data
    if (isActive) {
        gs.info('The plugin ' + pName + ' is active');
        pMgr.loadDemoData(pID);
    }
}




