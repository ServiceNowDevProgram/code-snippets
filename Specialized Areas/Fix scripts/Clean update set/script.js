//Fix Script for cleaning an update set of customer updates made by a selected developer

//Sys_id value of the selected update set
var UPDATE_SET_ID = '3f8ee93a45553010c0a05206e0e0f800';

//Value of the selected developer (sys_user)
var DEVELOPER = 'datacenterautomation@snc.maint';

//Query to get list of all updates in the selected update set made by the selected developer
var grCustomerUpdates = new GlideRecord('sys_update_xml');
grCustomerUpdates.addQuery('update_set', UPDATE_SET_ID);
grCustomerUpdates.addQuery('sys_created_by', DEVELOPER);
grCustomerUpdates.query();

//Logging details of Fix Script cleaning
gs.info('[Fix Script] - Removing: ' + grCustomerUpdates.getRowCount() + ' customer updates made by: ' + DEVELOPER + ' in update set: ' + UPDATE_SET_ID + '.');

//Remove all updates made by developer
grCustomerUpdates.deleteMultiple();
