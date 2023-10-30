var gr = new GlideRecord('table_name'); //replace table_name with actual table name
gr.addQuery('field', 'value'); //recommended to add queries to help filter out unrelated records
gr.setLimit(100); //recommended to start with a small batch of records first to check performance and function -- this sets the limit to only 100 records returned
gr.query();
gr.setWorkflow(false); //recommended to keep this line as this will help prevent business rules from running on this table -- keep in mind this doesn't stop business rules from related records from running
gr.deleteMultiple(); //this will delete multiple records quicker than using deleteRecord()
