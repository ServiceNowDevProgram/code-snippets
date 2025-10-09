function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
 
  var faxRegex = /^\d{10}$/; //allow only 10 digit in fax number field
    if (!faxRegex.test(newValue)) {
        g_form.addErrorMessage('Please enter a valid 10-digit fax number');
        g_form.clearValue('fax_num');
    }
   
}
