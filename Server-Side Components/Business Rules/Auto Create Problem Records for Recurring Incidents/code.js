(function executeRule(current, previous) {
    if (!current.cmdb_ci)
        return;

    var gr = new GlideAggregate('incident');
    gr.addQuery('cmdb_ci', current.cmdb_ci);
    gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(1));
    gr.addAggregate('COUNT');
    gr.query();

    if (gr.next() && gr.getAggregate('COUNT') >= 5) {
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
