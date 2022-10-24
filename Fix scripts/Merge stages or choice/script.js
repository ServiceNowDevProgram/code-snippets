var old_values = ['new', 'open', 'draft'];  // old values to be merged
var new_value = 'initiate';  // new Value of your stage
var grObj = new GlideRecord('table_name');  // replace table name here
grObj.addEncodedQuery('field_nameIN' + old_values.toString());  // add additional query as per your configuration
grObj.query();
while (grObj.next()) {
    grObj.field_name = new_value;   // field_name is your choice field name eg. stage, state etc
    grObj.setWorkflow(false);  // optional, can be used if you want to avoid running BRs, notifications etc
    grObj.update();
}
