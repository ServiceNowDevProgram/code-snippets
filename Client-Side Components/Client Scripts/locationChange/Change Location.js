function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   //Type appropriate comment here, and begin script below

   var loc=g_form.getReference('u_location').state;
  alert(loc);
   if(loc == 'CA'){
 alert("state is CA");
 g_form.addOption('preferred_language','africa','Africa');
   }else{
 g_form.removeOption('preferred_language','africa');
   }
   
}
