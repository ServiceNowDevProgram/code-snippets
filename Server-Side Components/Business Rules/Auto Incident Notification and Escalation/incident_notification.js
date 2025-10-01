// Business Rule: Complex Incident Escalation
// Escalates incidents based on priority and elapsed time since creation. 
// Notifies the assigned group and incident manager, reassigns the incident if SLA is breached, and logs all actions.

(function executeRule(current, previous /* null when async */) {
    const ESCALATION_THRESHOLD_HOURS = 4;
    const SLA_BREACH_THRESHOLD_HOURS = 8;
    const HIGHER_SUPPORT_GROUP_ID = gs.getProperty('esc.incident.higher_support_group', '');

    if (!HIGHER_SUPPORT_GROUP_ID) {
        gs.error('Higher Support Group sys_id not defined. Please configure esc.incident.higher_support_group.');
        return;
    }
    const timeElapsedInHours = parseInt(gs.dateDiff(current.getValue('sys_created_on'), gs.nowDateTime(), true)) / 3600;
    if (isEscalationNeeded(current, timeElapsedInHours)) {
        escalateIncidentPriority(current);
        notifyAssignedGroupAndManager(current);
        if (isSLABreached(timeElapsedInHours)) {
            reassignToHigherSupportGroup(current, HIGHER_SUPPORT_GROUP_ID);
        }

        logEscalationActions(current);
    }
    function isEscalationNeeded(incident, timeElapsed) {
        return incident.getValue('state') != 6 && timeElapsed > ESCALATION_THRESHOLD_HOURS;
    }
    function escalateIncidentPriority(incident) {
        const newPriority = Math.max(1, incident.getValue('priority') - 1);
        incident.setValue('priority', newPriority);
        gs.addInfoMessage('Incident priority has been escalated to ' + newPriority + '.');
    }
    function notifyAssignedGroupAndManager(incident) {
        const assignedGroup = incident.getValue('assignment_group');
        const incidentManager = incident.getValue('u_incident_manager');
        gs.eventQueue('incident.escalation.notification', incident, assignedGroup, incidentManager);
    }
    function isSLABreached(timeElapsed) {
        return timeElapsed > SLA_BREACH_THRESHOLD_HOURS;
    }
    function reassignToHigherSupportGroup(incident, groupId) {
        incident.setValue('assignment_group', groupId);
        gs.addInfoMessage('Incident reassigned to a higher support group due to SLA breach.');
    }
    function logEscalationActions(incident) {
        const logMessage = 'Incident escalated. Priority: ' + incident.getValue('priority') + 
                           ', Assigned Group: ' + incident.getValue('assignment_group') + 
                           ', Incident Manager: ' + incident.getValue('u_incident_manager');
        gs.log(logMessage, 'ComplexIncidentEscalation');
    }

})(current, previous);
