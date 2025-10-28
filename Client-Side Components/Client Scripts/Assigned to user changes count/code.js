function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

   //Type appropriate comment here, and begin script below
   alert("user sys_id " + newValue);
   var aj = new GlideAjax('assignedtochange'); //calling Script Include
   aj.addParam('sysparm_name', 'assigned'); //calling the function
   aj.addParam('sysparm_assign', newValue); //passing the parameter
   aj.getXMLAnswer(answer);

   function answer(response) { //response = count of incidents
	alert ("Assigned to has already been an part of " + response + " Incidents");
   }

   
}
