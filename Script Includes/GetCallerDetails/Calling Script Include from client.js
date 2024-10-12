function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }
   var aj = new GlideAjax("GetCallerDetails");  // This is the name of script include, as per the name of your requirement.
   aj.addParam('sysparm_name',"demoTest");  // This is calling a defined function in script include.
   aj.addParam('sysparm_caller_id',g_form.getValue('caller_id')); // getting a caller_id
   aj.getXML(callback);
   function callback(response){  // creating a callback function to store the response getting from script include.
	var answer = response.responseXML.documentElement.getAttribute('answer');
	//alert(answer); // This will alert the details.
	// Commented above code and replaced it with GlideModal
        var gm = new GlideModal("glide_alert_standard", false, 600);
        gm.setTitle("Caller Details");
        gm.setPreference("title", answer.toString());
        gm.setPreference("warning", "false");
        gm.render();
   }
   
}
