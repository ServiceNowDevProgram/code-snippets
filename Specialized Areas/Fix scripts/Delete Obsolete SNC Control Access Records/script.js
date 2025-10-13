/*
SNC Access Controls table is used to provided access to servicenow technicians when they need access for troubleshtting any instance issue.
This script will delete the SNC access control records which have past end date for better table management. 
*/
var delSncAccess = new GlideRecord('snc_access_control'); 
delSncAccess.addEncodedQuery('end<javascript:gs.beginningOfToday()'); // end date is before today;
delSncAccess.query();
delSncAccess.deleteMultiple(); // delete all snc access records whith past end date.
