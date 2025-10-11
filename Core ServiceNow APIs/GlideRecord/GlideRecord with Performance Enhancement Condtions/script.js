var TableGr = new GlideRecord('Table Name');
TableGr.addQuery('due_date', '')// this will be useful if we are making batches, run it only where due date is blank.
TableGr.setWorkflow('false'); // to ensure no BRs trigger for this update, will increase performance also.
TableGr.autoSysFields(false); //if you dont want system fields to be update, ie. sys_updated_on, sys_updated_by etc
TableGr.setLimit(1000); // its better to do it in batches to ensure the query doesnt time out or break the system
TableGr.query();
while(gr.next()){
  TableGr.update();
}
