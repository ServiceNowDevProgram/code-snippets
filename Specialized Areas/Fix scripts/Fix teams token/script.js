var userId = ''; // Place the userID of the user to whom you want to restart the teams token
var azureGr = new GlideRecord("sn_now_azure_user");
azureGr.addQuery('user.user_name',userId);
azureGr.query();
if(azureGr.next()){
	// gs.print(azureGr.upn);	Check if the record is valid one or not
    azureGr.deleteRecord();
}
