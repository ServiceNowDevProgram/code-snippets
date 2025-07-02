// Configure a variable for each catalog item that needs to be deactivated/reactivated. Variable value needs to be the catalog item sys_id
var newITAccountForm = 'acbf71d7dbd3341087d5bc56f39619d8';
var modifyITAccountForm = 'bdcaa8f6db58ff00ee115d87f49619b3';
var dlManagementForm = 'a7d613e0dbce7740ee115d87f496193c';
var sharedMailboxManagementForm = '04eabdd1dbc67340de2e32e43a96196c';

// Add the vatalog item variables to the array as required
var array = [modifyITAccountForm, dlManagementForm, sharedMailboxManagementForm];

for (item in array) {
	var grItem = new GlideRecord('sc_cat_item');
	grItem.get(array[item]);
	grItem.setValue('active', false); // False to deactivate, True to activate.
	grItem.update();
}
