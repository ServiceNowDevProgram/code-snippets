//Background script to force new value on read only fields

//ticketSysId - sys_id value of record which you would like to update
var ticketSysId = '';

//table - table where this record exists
var table = '';

//field - field which should be forced with new value on record
var field = '';

//value - new value which should be set on record
var value = '';

//GlideRecord to retrieve chose record
var gr = new GlideRecord(table);
var result = gr.get(ticketSysId);

if (result) {
    //In case record was correctly found, log information is executed and then update is made on record
    gs.info('Record found, updating field: ' + field + ' with value: ' + value);
    gr.setWorkflow(false);
    gr.setValue(field, value);
    gr.update();
} else {
    //In case record was not found, error log information is displayed
    gs.error('Not found record with sys_id: ' + ticketSysId + ' in table: ' + table);
}
