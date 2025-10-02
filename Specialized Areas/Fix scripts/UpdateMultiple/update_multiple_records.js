var GrQry = ""; //Query of the affected records.
var grTableName = new GlideRecord('table_name');// update table_name ex. incident
grTableName.addEncodedQuery(GrQry);
grTableName.query();
//gs.addInfoMessage(grTableName.getRowCount())
{
  grTableName.setValue("field", "value"); // Replace 'field' and 'value'
  grTableName.autoSysFields(false); // Prevents updating system fields like 'updated by'
  grTableName.setWorkflow(false); // Prevents triggering workflows
  grTableName.updateMultiple();
  }
