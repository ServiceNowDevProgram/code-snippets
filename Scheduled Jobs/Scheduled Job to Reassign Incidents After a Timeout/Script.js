// Scheduled Job: Reassign Stalled Incidents
// Run: Daily

(function execute() {
    var gr = new GlideRecord('incident');
    gr.addQuery('state', '2'); // In Progress state
    gr.addQuery('sys_updated_on', '<=', GlideDateTime.now().addDays(-2));
    gr.query();

    while (gr.next()) {
        gr.assignment_group = 'default_support_group_sys_id'; // Reassign to default group
        gr.update();
        gs.info('Incident ' + gr.number + ' has been reassigned due to inactivity.');
    }
})();
