function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
if(newValue == '3') // here 3 is the value of On Hold
{
	g_form.setMandatory('work_notes',true);
}
   else {
	g_form.setMandatory('work_notes',false);
   }
}
