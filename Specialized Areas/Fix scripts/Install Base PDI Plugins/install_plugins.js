// Change to "true" to install demo data with the plugins
var include_demo_data = false;

var plugins = [];

// Add or remove plugins by adding or removing plugins.push lines to the code below:

// Service Portfolio Management SLA Commitments
//   Service Portfolio Management Foundation
//   Service level management
plugins.push('com.snc.service_portfolio.sla_commitment');
// Service Catalog Manager
plugins.push('com.snc.sc_catalog_manager');
// PPM Standard (Project Portfolio Suite with Financials)
//   Performance Analytics - Content Pack - PPM Standard
//   Project Portfolio Suite
//   Release Management
//   Ideation with PPM
plugins.push('com.snc.financial_planning_pmo');
// Agile Development 2.0
plugins.push('com.snc.sdlc.agile.2.0');
// Agile Development - Unified Backlog
plugins.push('com.snc.sdlc.agile.multi_task');
// I18N: Internationalization
//   System Import Sets
//   I18N: Knowledge Management Internationalization Plugin v2
plugins.push('com.glide.i18n');
// Test Management 2.0
plugins.push('com.snc.test_management.2.0');
// Incident Management - Major Incident Management
//   Incident Communications Management
//   Incident Updates
//   Task-Outage Relationship
//   WebKit HTML to PDF
plugins.push('com.snc.incident.mim');
// Change Management - Risk Assessment
//   Assessment Designer
//   Assessment
//   Best Practice - Change Risk Calculator
plugins.push('com.snc.change_management.risk_assessment');

var main = new GlideMultiPluginManagerWorker();
main.setPluginIds(plugins);
main.setIncludeDemoData(include_demo_data);
//main.setLoadDemoDataOnly(true); // Can be used to install demo data after installation of plugins.
main.setProgressName("Plugin Installer");
main.setBackground(true);
main.start();

gs.info("Plugin installation has been initiated, please note that installation runs in the background and can take some time.");
gs.info("Please visit the following URLs to monitor the state of the installed plugins.");
gs.info("The installation has finished when all the following plugins have reached State=Active.");
gs.info("https://" + gs.getProperty("instance_name") + ".service-now.com/nav_to.do?uri=%2Fv_plugin_list.do%3Fsysparm_query%3DidIN" + plugins.join(","));
gs.info("A more detailed installation progress can also be seen in the Upgrade History log:");
gs.info("https://" + gs.getProperty("instance_name") + ".service-now.com/nav_to.do?uri=sys_upgrade_history_list.do");
