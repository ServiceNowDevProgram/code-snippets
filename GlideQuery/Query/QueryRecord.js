
var incidentQuery = new GlideQuery('incident');
incidentQuery.where('active', true);
incidentQuery.where('priority', '1'); 

incidentQuery.select('number', 'short_description', 'opened_at');
var incidentRecords = incidentQuery.toArray();

for (var i = 0; i < incidentRecords.length; i++) {
    var incident = incidentRecords[i];
    gs.info('Incident Number: ' + incident.getValue('number'));
    gs.info('Short Description: ' + incident.getValue('short_description'));
    gs.info('Opened at: ' + incident.getValue('opened_at'));
}
var singleIncident = incidentQuery.where('number', 'INC0010001').get();
if (singleIncident) {
    gs.info('Single Incident Number: ' + singleIncident.getValue('number'));
}
