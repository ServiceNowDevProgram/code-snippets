function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
   var short_description = g_form.getValue('short_description');
   var position = short_description.search('WEB');  //searching for a word WEB in short description sample word- WEB
   if(position == 0){
	  g_form.addOption('category','web','WEB');  // adding option of WEB in category choice field
	  g_form.setValue('category','WEB');   // setting the value of category to WEB
   }

}
