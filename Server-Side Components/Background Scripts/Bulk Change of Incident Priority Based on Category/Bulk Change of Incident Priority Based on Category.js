var priorityMapping = {
    'Network': 1, 
    'Application': 2, 
    'Hardware': 3 
};

var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('active', true);
incidentGR.query();

while (incidentGR.next()) {
    var category = incidentGR.category.toString();
    var newPriority = priorityMapping[category];

    if (newPriority) {
        incidentGR.priority = newPriority;
        incidentGR.update();
        gs.info('Updated Incident: ' + incidentGR.number + ' to Priority: ' + newPriority);
    }
}
