function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
	var requesterSysId = g_form.getValue('requester_name'); //get the field value
	var userGR = new GlideRecord('sys_user');   //query the user record
	userGR.addQuery('sys_id',requesterSysId);   //get that particular requester name detail
	userGR.query();
	while(userGR.next()){
		g_form.setValue('email',userGR.email);   // automatically on change of the requester name change the email in the email field
		
	}
   
}
