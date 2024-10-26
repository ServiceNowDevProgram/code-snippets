var incident = new GlideRecord('incident');
incident.addQuery('state', 'resolved');
incident.addQuery('resolved_at', '<=', gs.daysAgo(3));
incident.query();

while (incident.next()) {
    incident.state = 7; // Closed
    incident.update();
}
