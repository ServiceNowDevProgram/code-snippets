function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
	return;
   }
   if(newValue == 1) {
	g_form.removeOption('impact',3); // 3 is the value for impact 'low'
   } else {
	g_form.addOption('impact',3,'3 - Low');
   }
}
