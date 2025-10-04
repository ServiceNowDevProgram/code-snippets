function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   var vipalert = g_form.getReference('caller_id',vipFunction);
   function vipFunction(vipAlert){
	 if(vipAlert.vip == 'true'){
       g_form.setValue('urgency','1');
	  }
  }
   
}
