function onSubmit() {
   
	var messages = g_form.getValue('messages');
	var script = g_form.getValue('script');
	var count = 0;
	if(messages == '' && script.includes('getMessage'))
		{
			g_form.addErrorMessage("Please add any message in the Messages field before using getMessage() function");
			return false;
		}
   
}
