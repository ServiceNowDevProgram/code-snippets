var fields = g_form.getEditableFields();
for (var x = 0; x < fields.length; x++) {
if (fields[x] != 'sys_created_on' && fields[x] != 'sys_created_by' && fields[x] != 'sys_updated_on' && fields[x] != 'sys_updated_by'){
g_form.setMandatory(fields[x], false);
g_form.setReadOnly(fields[x], true);
}
}

