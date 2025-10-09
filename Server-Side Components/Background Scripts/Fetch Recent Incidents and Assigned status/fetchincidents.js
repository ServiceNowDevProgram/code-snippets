var inc = new GlideRecord('incident');
inc.orderByDesc('sys_created_on');
inc.setLimit(15);
inc.query();
gs.info('Below are the 15 most recently created incidents along with their Assigned status: ');
while (inc.next()) {
    var assignedIncident = '';
    if (inc.assigned_to) {
        assignedIncidentStatus = 'Assigned';
    } else {
        assignedIncidentStatus = '**NOT Assigned**';
    }
    gs.info('Number: ' + inc.number + ', Created on: ' + inc.sys_created_on + ', ' + assignedIncidentStatus);
}
