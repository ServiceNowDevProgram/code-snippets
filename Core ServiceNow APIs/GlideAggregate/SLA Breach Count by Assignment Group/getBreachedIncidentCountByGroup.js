function getBreachedIncidentCountByGroup() {
    var result = [];

    var ga = new GlideAggregate('task_sla');
    ga.addAggregate('COUNT');
    ga.groupBy('task.assignment_group');
    ga.addQuery('task.sys_class_name', 'incident');
    ga.addQuery('task.active', true);
    ga.addQuery('has_breached', true);
    ga.query();

    while(ga.next()){
        var grpName = ga.getValue('task.assignment_group.name') || 'No Group';
        var count = ga.getAggregate('COUNT');

        result.push({
            assignment_group: grpName,
            breached_incident_count: parseInt(count, 10)
        });

        gs.info('Assignment Group: ' + grpName + ' - Breached Incidents: ' + count);
    }
    return result;
}
