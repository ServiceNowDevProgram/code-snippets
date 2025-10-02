var GrQry = ""; //Query of the affected records.

var grTableName = new GlideRecord('table_name');
grTableName.addEncodedQuery(GrQry);
grTableName.query();
{
grTableName.setValue("field", "value"); // Replace 'field' and 'value'
grTableName.autoSysFields(false); // Prevents updating system fields like 'updated by'
grTableName.setWorkflow(false); // Prevents triggering workflows
grTableName.updateMultiple(); 
}
gs.print("Records updated successfully");
