//  This function will creat the model object and then route to the UI page which we configured to show the field details to fill by the user

/* 
Table- Incident (incident)
Form button - True
Client -True
Show Update - True
Onclick - Function name (sendEmail)



*/
 function sendEmail(){
 var modalT = new GlideModal("SendEmailEvent", false, 1200);
 modalT.setTitle("Send Email");
 modalT.setPreference("sysparm_sys_id", g_form.getUniqueValue());
 modalT.render();
 }