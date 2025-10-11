(function executeRule(current, previous /*null when async*/) {
    if (current.sla_due && current.sla_due <= gs.minutesAgo(30)) {
        current.priority = '1'; 
        gs.info('Incident ' + current.number + ' escalated due to impending SLA breach.');
    }
})(current, previous);
