// Hours - set hours in a system property, and call below function to escalate
// Support it with the events and notifications

function escalateHighPriorityCases(hours) {
    var gr = new GlideRecord('incident');
    gr.addQuery('priority', '1 - Critical');
    gr.addQuery('opened_at', '<=', gs.hoursAgo(hours));
    gr.query();
    
    while (gr.next()) {
        gs.eventQueue('incident.escalation', gr, gr.assigned_to, 'Escalation triggered after ' + hours + ' hours.');
    }
}
