(function executeRule(current, previous /*null when async*/) {
/*
Replace table_name with the table name on which you're writing a BR, ex:cmdb_ci_server
Replace unique_field with the field which you're taking as a coalese field, ex: serial_number
*/
var uniqueRecord = new GlideRecord("<table_name>");
uniqueRecord.addQuery("<unique_field>", current.<unique_field_name>);
uniqueRecord.setLimit(1);
uniqueRecord.query();
if (uniqueRecord.next()) {
  uniqueRecord.addErrorMessage("Entry for this <field_name> already exists");
  current.setAbortAction(true);
}
})(current, previous);
