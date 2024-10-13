var slaAgg = new GlideAggregate('task_sla');
slaAgg.addQuery('task.active', true); 
slaAgg.groupBy('task.assignment_group');
slaAgg.addAggregate('COUNT'); 
slaAgg.query();

while (slaAgg.next()) {
    var assignmentGroup = slaAgg.getValue('task.assignment_group.name');
    var slaCount = slaAgg.getAggregate('COUNT');
    gs.info('Assignment Group: ' + assignmentGroup + ' has ' + slaCount + ' active SLAs.');
}
