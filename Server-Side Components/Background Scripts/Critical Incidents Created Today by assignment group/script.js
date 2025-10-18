//Count of Critical Incidents Created Today (by Assignment Group)
(function() {
    var ga = new GlideAggregate('incident');
    ga.addQuery('priority', '1'); // Critical priority

    var start = new GlideDateTime();
    start.beginningOfToday(); // start of the day
    ga.addQuery('sys_created_on', '>=', start);
    ga.groupBy('assignment_group');
    ga.addAggregate('COUNT');
    ga.query();

    gs.print("Critical Incidents Created Today (by Assignment Group):");
    while (ga.next()) {
        gs.print((ga.assignment_group.getDisplayValue() || "Unassigned") + " → " + ga.getAggregate('COUNT'));
    }
})();
