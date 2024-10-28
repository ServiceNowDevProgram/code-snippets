//Escalate incidents based on priority and time elapsed since creation.
//Notify the assigned group and incident manager.

// Business Rule: Complex Incident Escalation
(function executeRule(current, previous /*null when async*/) {
    // Constants
    var ESCALATION_THRESHOLD_HOURS = 4;
    var SLA_BREACH_THRESHOLD_HOURS = 8;
    var HIGHER_SUPPORT_GROUP = 'High Priority Support';

    // Calculate time elapsed since incident creation
    var timeElapsed = gs.dateDiff(current.sys_created_on, gs.nowDateTime(), true);

    // Check if the incident is unresolved and time elapsed exceeds the escalation threshold
    if (current.state != 'Resolved' && timeElapsed > ESCALATION_THRESHOLD_HOURS * 3600) {
        // Escalate the incident by updating its priority
        current.priority = Math.max(1, current.priority - 1);
        gs.addInfoMessage('Incident priority has been escalated.');

        // Notify the assigned group and incident manager
        var assignedGroup = current.assignment_group.getDisplayValue();
        var incidentManager = current.u_incident_manager.getDisplayValue();
        gs.eventQueue('incident.escalation.notification', current, assignedGroup, incidentManager);

        // Check if the SLA is breached
        if (timeElapsed > SLA_BREACH_THRESHOLD_HOURS * 3600) {
            // Reassign the incident to a higher support group
            current.assignment_group.setDisplayValue(HIGHER_SUPPORT_GROUP);
            gs.addInfoMessage('Incident has been reassigned to a higher support group due to SLA breach.');
        }

        // Log all actions taken
        var logMessage = 'Incident escalated. Priority: ' + current.priority + ', Assigned Group: ' + assignedGroup + ', Incident Manager: ' + incidentManager;
        gs.log(logMessage, 'ComplexIncidentEscalation');
    }
})(current, previous);
