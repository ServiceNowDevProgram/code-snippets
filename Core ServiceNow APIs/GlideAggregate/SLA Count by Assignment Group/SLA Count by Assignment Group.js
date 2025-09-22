var slaAgg = new GlideAggregate('task_sla');
slaAgg.addQuery('task.active', true); // Only active tasks
slaAgg.groupBy('task.assignment_group'); // Group by assignment group
slaAgg.addAggregate('COUNT'); // Count the number of active SLAs per assignment group
slaAgg.query();

while (slaAgg.next()) {
    var assignmentGroup = slaAgg.getValue('task.assignment_group.name');
    var slaCount = slaAgg.getAggregate('COUNT');
    gs.info('Assignment Group: ' + assignmentGroup + ' has ' + slaCount + ' active SLAs.');
}
