// UI Action - "Redirect to Adobe Sign".
// HR Agent workspace
Trigger Condition - current.hr_service== gs.getproperty("On Boarding HR Service");
Format Configurable Workspace - "Checked" for workspace button visibility
Table - "sn_hr_le_case"

//Workspace Client script
function onClick(g_form) {

 g_form.setValue("work_notes","Redirected to Adobe Application"); // Worknotes updated 
 g_form.addInfoMessage("Redirected to Adobe Application");
 var win= top.window.open("https://xyz.eu1.echosign.com/account/homeJS",'_blank'); // Redirect to Adobe Sign page
 win.focus();
 g_form.save();
}
