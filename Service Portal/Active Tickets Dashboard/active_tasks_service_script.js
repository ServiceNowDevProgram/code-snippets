(function() {
  
    // Using GlideAggregate for active incidents
    var incidentAgg = new GlideAggregate('incident');
    incidentAgg.addQuery('state', '!=', 'Closed');
    incidentAgg.addAggregate('COUNT');
    incidentAgg.query();
    incidentAgg.next();
    data.activeIncidents = incidentAgg.getAggregate('COUNT');

    // Using GlideAggregate for active changes
    var changeAgg = new GlideAggregate('change_request');
    changeAgg.addQuery('state', '!=', 'Closed');
    changeAgg.addAggregate('COUNT');
    changeAgg.query();
    changeAgg.next();
    data.activeChanges = changeAgg.getAggregate('COUNT');

    // Using GlideAggregate for active problems
    var problemAgg = new GlideAggregate('problem');
    problemAgg.addQuery('state', '!=', 'Closed');
    problemAgg.addAggregate('COUNT');
    problemAgg.query();
    problemAgg.next();
    data.activeProblems = problemAgg.getAggregate('COUNT');

    // Using GlideAggregate for active catalog tasks
    var catalogTaskAgg = new GlideAggregate('sc_task');
    catalogTaskAgg.addQuery('state', '!=', 'Closed');
    catalogTaskAgg.addAggregate('COUNT');
    catalogTaskAgg.query();
    catalogTaskAgg.next();
    data.activeCatalogTasks = catalogTaskAgg.getAggregate('COUNT');
})();
