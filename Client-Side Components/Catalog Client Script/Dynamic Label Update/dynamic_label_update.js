function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

   var asset = newValue + ' Asset Name';
   g_form.setLabelOf('asset_name', asset);   
}
