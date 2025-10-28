function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   if (newValue == 6)  //State on which section needs to be displayed
		 g_form.setSectionDisplay('resolution_information', true);  //Section which needs to be display
	else
		g_form.setSectionDisplay('resolution_information', false);   
}
