(function() {
var subject = 'Incident Update';
var body = 'Hello, this is an automated update for your incident.';
gs.eventQueueScheduled('custom.email.event', current, subject, body, new GlideDateTime().addSeconds(10));
})();
