// Scheduled Script Execution: Automate Incident Escalation Based on SLA Breach
(function executeScheduledJob() {
    // Constants for thresholds
    const SLA_THRESHOLD_PERCENTAGE = 0.8; // 80% of SLA duration
    const HIGH_PRIORITY = 1; // Priority level for escalation (1 = High)
    
    // Query for active high-priority incidents
    var incidentGr = new GlideRecord('incident');
    incidentGr.addQuery('active', true);
    incidentGr.addQuery('priority', HIGH_PRIORITY);
    incidentGr.query();

    while (incidentGr.next()) {
        // Check associated SLAs
        var slaGr = new GlideRecord('task_sla');
        slaGr.addQuery('task', incidentGr.sys_id);
        slaGr.addQuery('state', 'active');
        slaGr.query();

        while (slaGr.next()) {
            // Check if the SLA is nearing breach
            if (slaGr.getElapsedTime() >= (slaGr.sla_duration * SLA_THRESHOLD_PERCENTAGE)) {
                escalateIncident(incidentGr);
                notifyAssignedGroup(incidentGr);
            }
        }
    }
    
    gs.info('Incident escalation job executed successfully.');
})();

// Function to escalate the incident
function escalateIncident(incidentGr) {
    incidentGr.state = 3; // Set to Escalated state
    incidentGr.update();
    gs.info('Incident ' + incidentGr.number + ' escalated.');
}

// Function to notify the assigned group
function notifyAssignedGroup(incidentGr) {
    var email = new GlideEmailOutbound();
    email.setSubject('Incident Escalation: ' + incidentGr.number);
    
    // Get assigned group email addresses
    var groupEmails = getGroupEmails(incidentGr.assignment_group);
    email.setTo(groupEmails.join(', ')); // Notify the assigned group
    email.setBody('The incident ' + incidentGr.number + ' is nearing SLA breach and has been escalated. Please take action.');
    email.send();
    
    gs.info('Notification sent for incident ' + incidentGr.number + ' to group: ' + incidentGr.assignment_group.getDisplayValue());
}

// Function to get email addresses of the assigned group
function getGroupEmails(groupId) {
    var emails = [];
    var groupGr = new GlideRecord('sys_user_grmember');
    groupGr.addQuery('group', groupId);
    groupGr.query();

    while (groupGr.next()) {
        var userGr = new GlideRecord('sys_user');
        userGr.get(groupGr.user);
        if (userGr.email) {
            emails.push(userGr.email);
        }
    }
    return emails;
}
