var GrQry = ""; //Query of the affected records.

var grTableName = new GlideRecord('table_name');
grTableName.addEncodedQuery(GrQry);
grTableName.query();
  
while (grTableName.next()) {
grTableName.setValue("field", "value"); // Replace 'field' and 'value'
grTableName.autoSysFields(false); // Prevents updating system fields like 'updated by'
grTableName.setWorkflow(false); // Prevents triggering workflows
grTableName.update(); 
    }
gs.print("Records updated successfully");
