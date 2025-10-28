function onChange(control, oldValue, newValue, isLoading, isTemplate) {
if (isLoading || newValue == '') {
return;
}
if (newValue == 'inquiry') { //Onchange of Category
g_form.removeOption('impact', '1');
g_form.removeOption('urgency', '1');
}
}
