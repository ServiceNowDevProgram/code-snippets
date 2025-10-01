(function() {
    var userId = gs.getUserID(); 
    data.userId = userId; 
    
    // Using GlideAggregate for active incidents assigned to the user
    var incidentAgg = new GlideAggregate('incident');
    incidentAgg.addEncodedQuery('state!=Resolved^state!=Closed^assigned_to=' + userId);
    incidentAgg.addAggregate('COUNT');
    incidentAgg.query();
    incidentAgg.next();
    data.activeIncidents = incidentAgg.getAggregate('COUNT');

    // Using GlideAggregate for active changes assigned to the user
    var changeAgg = new GlideAggregate('change_request');
    changeAgg.addEncodedQuery('state!=Closed^assigned_to=' + userId);
    changeAgg.addAggregate('COUNT');
    changeAgg.query();
    changeAgg.next();
    data.activeChanges = changeAgg.getAggregate('COUNT');

    // Using GlideAggregate for active problems assigned to the user
    var problemAgg = new GlideAggregate('problem');
    problemAgg.addEncodedQuery('state!=Closed^assigned_to=' + userId);
    problemAgg.addAggregate('COUNT');
    problemAgg.query();
    problemAgg.next();
    data.activeProblems = problemAgg.getAggregate('COUNT');

    // Using GlideAggregate for active catalog tasks assigned to the user
    var catalogTaskAgg = new GlideAggregate('sc_task');
    catalogTaskAgg.addEncodedQuery('state!=Closed^assigned_to=' + userId);
    catalogTaskAgg.addAggregate('COUNT');
    catalogTaskAgg.query();
    catalogTaskAgg.next();
    data.activeCatalogTasks = catalogTaskAgg.getAggregate('COUNT');
})();
