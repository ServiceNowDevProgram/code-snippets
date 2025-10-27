// Below script export incidents of the last 7 days and email the CSV using Scheduled Script
var fileName = 'incident_export_' + gs.nowDateTime() + '.csv';
var csv = 'Number,Short Description,Priority\n';
var gr = new GlideRecord('incident');
gr.addQuery('opened_at', '>=', gs.daysAgoStart(7));
gr.query();
while (gr.next()) {
    csv += gr.number + ',' + gr.short_description + ',' + gr.priority + '\n';
}
var attachment = new GlideSysAttachment();
attachment.write('incident', '', fileName, csv);
gs.eventQueue('csv.report.ready', null, fileName, gs.getUserID());
