(function() {
    // Create GlideAggregate object on 'incident' table
    var ga = new GlideAggregate('incident');
    
    // Filter only open incidents (state != Closed (7))
    ga.addQuery('state', '!=', 7);
    
    // Group results by priority
    ga.groupBy('priority');
    
    // Count number of incidents per priority
    ga.addAggregate('COUNT');
    
    ga.query();
    
    gs.info('Open Incidents by Priority:');
    
    while (ga.next()) {
        var priority = ga.priority.getDisplayValue(); // e.g., Critical, High
        var count = ga.getAggregate('COUNT');
        gs.info(priority + ': ' + count);
    }
})();
