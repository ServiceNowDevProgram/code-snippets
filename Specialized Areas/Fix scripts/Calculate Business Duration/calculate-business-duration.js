// This script will retrospectively calculate the business duration of records and update the business_duration field with the correct value.

var selectedSchedule = ''; // Set the sys_id of the schedule you'd like to use to calculate duration
table = 'sc_req_item'; // Change this to set a different table such as incident

var gr = new GlideRecord(table);
gr.addEncodedQuery("stateIN3,4^sys_created_on>javascript:gs.dateGenerate('2022-01-01','00:00:01')"); // Set your encoded query to whatever you would like
gr.query();
var count = 0;
while (gr.next()) {
    var startDate = new GlideDateTime(gr.sys_created_on);
    var endDate = new GlideDateTime(gr.closed_at);
    var schedule = new GlideSchedule();
    schedule.load(selectedSchedule); 
    var duration = schedule.duration(startDate, endDate);
    gr.setValue('business_duration', duration);
    var opened = gr.sys_created_on.getDisplayValue();
    var resolved = gr.closed_at.getDisplayValue();
    gr.setValue('calendar_duration', gs.dateDiff(opened, resolved, false));
    gr.setWorkflow('false'); // Set to true if you want workflows to run
    gr.autoSysFields('false'); // Set to true if you want system fields to be updated
    gr.update();
    count = count + 1;
}
gs.info(count + " records updated with new business duration value");
