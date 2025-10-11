// Create this as fix script or run as background script as per your requirement
(function normalizeProdWithGlideFilter() {
    var changeGR = new GlideRecord('change_request');
    changeGR.addNotNullQuery('u_environment');
    changeGR.query();

    var filter = new GlideFilter('u_environment=prod', 'normalizeProdFilter');
    filter.setCaseSensitive(false);         // Match any case variant of "prod"
    filter.setEnforceSecurity(true);        // Enforce ACLs

    var updated = 0;

    while (changeGR.next()) {
        if (filter.match(changeGR, true)) {
            var original = changeGR.u_environment.toString();

            if (original !== 'Prod') {
                changeGR.u_environment = 'Prod';
                changeGR.update();
                updated++;
            }
        }
    }
    gs.info('✔️ Environment normalization completed. Total updated: ' + updated);
})();
