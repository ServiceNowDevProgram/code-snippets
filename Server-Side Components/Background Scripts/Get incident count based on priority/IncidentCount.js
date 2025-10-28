(function() {
    var priorities = {};
    var agg = new GlideAggregate('incident');
    agg.addAggregate('COUNT');
    agg.groupBy('priority');
    agg.query();
    while (agg.next()) {
        var priority = agg.getDisplayValue('priority') || 'No Priority Set';
        var count = agg.getAggregate('COUNT');
        priorities[priority] = parseInt(count, 10);
    }
    for (var priority in priorities) {
        gs.info('Priority: ' + priority + ' | Count: ' + priorities[priority]);
    }
})();
