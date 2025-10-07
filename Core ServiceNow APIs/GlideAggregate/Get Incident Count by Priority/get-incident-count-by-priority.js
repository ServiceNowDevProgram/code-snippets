// Get the count of Incidents grouped by Priority
var incidentGr = new GlideAggregate('incident');
incidentGr.addAggregate('COUNT', 'priority');
incidentGr.query();
while (incidentGr.next()) {
    gs.print(incidentGr.priority.getDisplayValue() + '=' + incidentGr.getAggregate('COUNT', 'priority'));
}
