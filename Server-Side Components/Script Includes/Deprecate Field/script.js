function deprecateField(fieldName, tableName) {
  if (!GlideTableDescriptor.fieldExists(tableName, fieldName)) return;
  var deprecationLabel = " (deprecated)";
  var dictGr = new GlideRecord("sys_documentation");
  dictGr.addQuery("name", tableName);
  dictGr.addQuery("element", fieldName);
  dictGr.addEncodedQuery("labelNOT LIKE(deprecated)");
  dictGr.query();
  if (dictGr.next()) {
    dictGr.setValue("label", dictGr.label + deprecationLabel);
    dictGr.setValue("plural", dictGr.plural + deprecationLabel);
    dictGr.setValue("hint", dictGr.hint + deprecationLabel);
    dictGr.update();
  }
}
