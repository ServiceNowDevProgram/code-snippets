/* 
//This action will be able to copy the sysids of multiselected records.

Table - Global
List Choice - True
Client - True
onClick - copySysIDs()

Result - All the sysids will be copied as comma-separated strings which you can further copy into a system property for validations

*/

function copySysIDs(){
	var sysIds = g_list.getChecked();
	copyToClipboard(sysIds);
}
