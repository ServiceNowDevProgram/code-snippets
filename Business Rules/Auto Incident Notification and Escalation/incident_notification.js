// Business Rule: Complex Incident Escalation
// Escalate incidents based on priority and time elapsed since creation.
// Notify the assigned group and incident manager.
(function executeRule(current, previous /*null when async*/) {
    // Constants
    var ESCALATION_THRESHOLD_HOURS = 4;
    var SLA_BREACH_THRESHOLD_HOURS = 8;
    var HIGHER_SUPPORT_GROUP = 'High Priority Support';

    // Calculate time elapsed since incident creation
    var timeElapsed = gs.dateDiff(current.getValue('sys_created_on'), gs.nowDateTime(), true);

    // Check if the incident is unresolved and time elapsed exceeds the escalation threshold
    if (current.getValue('state') != 6 && timeElapsed > ESCALATION_THRESHOLD_HOURS * 3600) {
        // Escalate the incident by updating its priority
        current.setValue('priority', Math.max(1, current.getValue('priority') - 1));
        gs.addInfoMessage('Incident priority has been escalated.');

        // Notify the assigned group and incident manager
        var assignedGroup = current.getValue('assignment_group');
        var incidentManager = current.getValue('u_incident_manager');
        gs.eventQueue('incident.escalation.notification', current, assignedGroup, incidentManager);

        // Check if the SLA is breached
        if (timeElapsed > SLA_BREACH_THRESHOLD_HOURS * 3600) {
            // Reassign the incident to a higher support group
            current.setValue('assignment_group', HIGHER_SUPPORT_GROUP);
            gs.addInfoMessage('Incident has been reassigned to a higher support group due to SLA breach.');
        }

        // Log all actions taken
        var logMessage = 'Incident escalated. Priority: ' + current.getValue('priority') + ', Assigned Group: ' + assignedGroup + ', Incident Manager: ' + incidentManager;
        gs.log(logMessage, 'ComplexIncidentEscalation');
    }
})(current, previous);
