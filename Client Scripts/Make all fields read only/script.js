function setAllFieldsReadOnly() {
  var fields = g_form.getEditableFields().filter(function (f) {
    if (f.indexOf("sys_created") == 0) return false;
    if (f.indexOf("sys_updated") == 0) return false;
    return true;
  })
  fields.forEach(fieldname => {
    g_form.setMandatory(fieldname, false);
    g_form.setReadOnly(fieldname, true);
  });
}