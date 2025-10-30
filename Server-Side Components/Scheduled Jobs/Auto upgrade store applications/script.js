upgradeSelectedStoreApps();

function upgradeSelectedStoreApps() {
    var propertyName = "auto_upgrade_store_apps";
    var storeAppsList = gs.getProperty(propertyName, "");
    if (!storeAppsList) {
        gs.info("No store applications listed for auto-upgrade.");
        return;
    }
    var appsToUpgrade = storeAppsList.split(",").map(function(app) {
        return app.trim();
    });
    var upgradedApps = [];
    var storeAppGr = new GlideRecord('sys_store_app');
    storeAppGr.addQuery('active', true); // Only active store applications
    storeAppGr.addQuery('sys_id', 'IN', appsToUpgrade); // Filter by system property list
    storeAppGr.query();
    while (storeAppGr.next()) {
        var appId = storeAppGr.getValue('sys_id');
        var appName = storeAppGr.getValue('name');
        var currentVersion = storeAppGr.getValue('version');
        var availableVersion = storeAppGr.getValue('latest_version');
        if (availableVersion && currentVersion !== availableVersion) {
            try {
                gs.info('Upgrading store application: ' + appName + ' from version ' + currentVersion + ' to ' + availableVersion);
                var worker = new sn_appclient.AppUpgrader();
                storeUpgradeResult = worker.upgrade(appId.toString(), availableVersion.toString(), false);
                if (storeUpgradeResult) {
                    gs.info('Store application "' + appName + '" upgraded successfully.');
                    upgradedApps.push({
                        name: appName,
                        fromVersion: currentVersion,
                        toVersion: availableVersion
                    });
                } else {
                    gs.error('Failed to upgrade store application: ' + appName);
                }
            } catch (e) {
                gs.error('Error upgrading store application "' + appName + '": ' + e.message);
            }
        } else {
            gs.info('Store application "' + appName + '" is already up-to-date.');
        }
    }
}
