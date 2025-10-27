var ga = new GlideAggregate('incident');
    ga.addQuery('active', true);
    ga.addQuery('assigned_to.active', false);
    ga.addAggregate('COUNT', 'assigned_to');
    ga.query();

    while (ga.next()) {
        var inactiveUser = ga.assigned_to.getDisplayValue();
        var taskCount = ga.getAggregate('COUNT', 'assigned_to');
        gs.info("Inactive user " + inactiveUser + " has " + IncidentCount + " active tasks.");
    }
