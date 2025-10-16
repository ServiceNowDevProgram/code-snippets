(function executeRule(current, previous) {
    if (!current.cmdb_ci)
        return;

    var ck = new GlideAggregate('incident');
    ck.addQuery('cmdb_ci', current.cmdb_ci);
    ck.addQuery('sys_created_on', '>=', gs.daysAgoStart(1));
    ck.addAggregate('COUNT');
    ck.query();

    if (ck.next() && ck.getAggregate('COUNT') >= 5) {
        var problemGR = new GlideRecord('problem');
        problemGR.addQuery('cmdb_ci', current.cmdb_ci);
        problemGR.addQuery('state', '<', 8); // Not Closed
        problemGR.query();

        if (!problemGR.hasNext()) {
            problemGR.initialize();
            problemGR.short_description = 'Recurring incidents on ' + current.cmdb_ci.name;
            problemGR.cmdb_ci = current.cmdb_ci;
            problemGR.state = 1; // New
            problemGR.insert();
            gs.log('Problem created for recurring incidents on CI: ' + current.cmdb_ci.name);
        }
    }
})(current, previous);
