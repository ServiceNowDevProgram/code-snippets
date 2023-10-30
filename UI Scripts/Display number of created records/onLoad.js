function onLoad() {
	if(g_form.isNewRecord())
		{
    var obj = new SampleUIScript(); // Initialize the class in UI Script 
      // Call the function in UI Script
      obj.callFromClientScript("incident"); //you can give your required table name
    }
}
