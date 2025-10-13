(function() {
    var MAX_REASSIGNMENTS = 5;
    var flaggedIncidents = [];
    var flaggedCount = 0;
    var totalChecked = 0;
    var incGR = new GlideRecord('incident');
    incGR.addActiveQuery();
    incGR.query();
    while (incGR.next()) {
        totalChecked++;
        // Count how many times 'assigned_to' changed
        var auditAgg = new GlideAggregate('sys_audit');
        auditAgg.addQuery('documentkey', incGR.getUniqueValue());
        auditAgg.addQuery('fieldname', 'assigned_to');
        auditAgg.addAggregate('COUNT');
        auditAgg.query();
        var reassignmentCount = 0;
        if (auditAgg.next()) {
            reassignmentCount = parseInt(auditAgg.getAggregate('COUNT'), 10);
        }
        // Flag incidents exceeding threshold
        if (reassignmentCount > MAX_REASSIGNMENTS) {
            flaggedIncidents.push(incGR.getValue('number'));
            flaggedCount++;
        }
    }
    gs.info(' Checked: ' + totalChecked + ' | Flagged: ' + flaggedCount + ' | Threshold: ' + MAX_REASSIGNMENTS);
    if (flaggedIncidents.length > 0)
        gs.info(' Flagged Incidents: ' + flaggedIncidents.join(', '));
    else
        gs.info(' No incidents exceeded the reassignment threshold.');
})();
