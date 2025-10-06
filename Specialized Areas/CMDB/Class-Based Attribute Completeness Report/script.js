var classes = ['cmdb_ci_win_server', 'cmdb_ci_appl', 'cmdb_ci_computer'];
var fields = ['os', 'location'];

classes.forEach(function(className) {
    var total = new GlideAggregate(className);
    total.addAggregate('COUNT');
    total.query();
    var totalCount = total.next() ? total.getAggregate('COUNT') : 0;

    fields.forEach(function(field) {
        var missing = new GlideAggregate(className);
        missing.addNullQuery(field);
        missing.addAggregate('COUNT');
        missing.query();
        var missingCount = missing.next() ? missing.getAggregate('COUNT') : 0;

        gs.print(className + ' | Missing ' + field + ': ' + missingCount + ' / ' + totalCount);
    });
});
