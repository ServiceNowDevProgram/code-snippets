// Count the number of incident records
var gr = new GlideRecord('incident');
gr.query();
var count = gr.getRowCount();
gs.info('Total number of incidents: ' + count);
