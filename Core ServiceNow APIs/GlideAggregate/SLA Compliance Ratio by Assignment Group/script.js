(function() {
    var ga = new GlideAggregate('task_sla');
    ga.addEncodedQuery('task.sys_class_name=incident^active=false');
    ga.addAggregate('COUNT'); // All SLAs
    ga.addAggregate('COUNT', 'breach', 'true'); // breached SLAs
    ga.groupBy('task.assignment_group');
    ga.query();

    gs.info('SLA Compliance Ratio by Group');

    while (ga.next()) {
        var total = parseInt(ga.getAggregate('COUNT'));
        var breached = parseInt(ga.getAggregate('COUNT', 'breach', 'true'));
        var rate = breached ? ((breached / total) * 100).toFixed(2) : 0;
        gs.info(ga.getDisplayValue('task.assignment_group') + ': ' + rate + '% breached (' + breached + '/' + total + ')');
    }
    
})();
