(function() {
    var groupName = 'Incident Management';
    var emailFrom = 'no-reply@yourcompany.com';
    var emailSubject = 'ServiceNow Daily Summary';

    var todayStart = new GlideDateTime();
    todayStart.setDisplayValue(gs.beginningOfToday());

    var dayAgo = new GlideDateTime();
    dayAgo.addDaysUTC(-1);

    // Open Incidents (not closed)
    var grOpenInc = new GlideAggregate('incident');
    grOpenInc.addAggregate('COUNT');
    grOpenInc.addQuery('state', '!=', '7');
    grOpenInc.query();
    grOpenInc.next();
    var openIncidents = grOpenInc.getAggregate('COUNT');

    // Pending Approvals
    var grApprovals = new GlideAggregate('sysapproval_approver');
    grApprovals.addAggregate('COUNT');
    grApprovals.addQuery('state', 'requested');
    grApprovals.query();
    grApprovals.next();
    var pendingApprovals = grApprovals.getAggregate('COUNT');

    // SLAs Breached Today
    var grSLA = new GlideAggregate('task_sla');
    grSLA.addAggregate('COUNT');
    grSLA.addQuery('planned_end_time', '>=', todayStart); //Breach time is the field Label
    grSLA.addQuery('stage', 'breached');
    grSLA.query();
    grSLA.next();
    var breachedSLAs = grSLA.getAggregate('COUNT');

    // High Priority Incidents (P1 & P2 open)
    var grHighPri = new GlideAggregate('incident');
    grHighPri.addAggregate('COUNT');
    grHighPri.addQuery('priority', 'IN', '1,2');
    grHighPri.addQuery('state', '!=', '7');
    grHighPri.query();
    grHighPri.next();
    var highPriorityOpen = grHighPri.getAggregate('COUNT');

    // Incidents unassigned > 24 hours
    var grUnassigned = new GlideAggregate('incident');
    grUnassigned.addAggregate('COUNT');
    grUnassigned.addQuery('assigned_to', 'ISEMPTY');
    grUnassigned.addQuery('opened_at', '<=', dayAgo);
    grUnassigned.addQuery('state', '!=', '7');
    grUnassigned.query();
    grUnassigned.next();
    var unassignedOld = grUnassigned.getAggregate('COUNT');

    var emailBody = '';
    emailBody += ' *ServiceNow Daily Summary (' + gs.nowDate() + ')*\n\n';
    emailBody += '• Open Incidents: ' + openIncidents + '\n';
    emailBody += '• Pending Approvals: ' + pendingApprovals + '\n';
    emailBody += '• SLAs Breached Today: ' + breachedSLAs + '\n';
    emailBody += '• High Priority Incidents (P1/P2): ' + highPriorityOpen + '\n';
    emailBody += '• Unassigned Incidents > 24h: ' + unassignedOld + '\n';
    emailBody += '\n';
    var recipients = [];

    var group = new GlideRecord('sys_user_group');
    if (group.get('name', groupName)) {
        var m2m = new GlideRecord('sys_user_grmember');
        m2m.addQuery('group', group.sys_id);
        m2m.query();
        while (m2m.next()) {
            var user = m2m.user.getRefRecord();
            if (user.active && user.email) {
                recipients.push(user.email.toString());
            }
        }
    } else {
        gs.error('Group "' + groupName + '" not found. No emails sent.');
        return;
    }

    if (recipients.length === 0) {
        gs.info('No active users with email found in group "' + groupName + '". No emails sent.');
        return;
    }

    for (var i = 0; i < recipients.length; i++) {
        var email = new GlideRecord('sys_email');
        email.initialize();
        email.type = 'send-ready';
        email.recipients = recipients[i];
        email.from = emailFrom;
        email.subject = emailSubject;
        email.body = emailBody;
        email.insert();
    }

})();
