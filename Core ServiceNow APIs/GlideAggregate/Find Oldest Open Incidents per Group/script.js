var ga = new GlideAggregate('incident');
    ga.addActiveQuery();
    ga.addAggregate('MIN', 'opened_at');
    ga.groupBy('assignment_group');
    ga.query();

    while (ga.next()) {
        var group = ga.assignment_group.getDisplayValue();
        var oldestIncidentDate = ga.getAggregate('MIN', 'opened_at');
        gs.info("Oldest open incident for " + group + " was created on: " + oldestIncidentDate);
    }
