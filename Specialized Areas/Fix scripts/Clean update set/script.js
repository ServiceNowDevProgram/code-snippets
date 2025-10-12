//Fix Script for cleaning an update set of customer updates made by a selected developer

//Sys_id value of the selected update set
var UPDATE_SET_ID = 'fa6ec9475367e6104834d2a0a0490e63';

//Value of the selected developer (sys_user)
var DEVELOPER = 'admin';

//Query to get list of all updates in the selected update set made by the selected developer
var grCustomerUpdates = new GlideRecord('sys_update_xml');
grCustomerUpdates.addQuery('update_set', UPDATE_SET_ID);
grCustomerUpdates.addQuery('sys_created_by', DEVELOPER);
grCustomerUpdates.query();
while (grCustomerUpdates.next()) {
    // get scope default update set
    grCustomerUpdates.setValue('update_set', getDefaultUpdateSet(grCustomerUpdates.getValue('application')).sys_id); // Move the customer update to default update set
    grCustomerUpdates.update();
    gs.info('[Fix Script] - Moving: ' + grCustomerUpdates.getRowCount() + ' customer updates made by: ' + DEVELOPER + ' in update set: ' + UPDATE_SET_ID + ' to ' + getDefaultUpdateSet(grCustomerUpdates.getValue('application')).name);
}

/*
Function to get Default update set (application based)
input : application , type = glideRecord Object
output : Default update set, type = glideRecord Object
*/

function getDefaultUpdateSet(application) {
    var updateSet = new GlideRecord('sys_update_set');
    updateSet.addEncodedQuery('application=' + application + '^name=Default');
    updateSet.query();
    if (updateSet.next())
        return updateSet;
    else
        gs.info("Default update set not found");
}
