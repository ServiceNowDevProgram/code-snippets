function onCellEdit(sysIDs, table, oldValues, newValue, callback) {
  var saveAndClose = true;
 //Type appropriate comment here, and begin script below
  // here the values are 7|closed skipped, 3|closed complete and 4|closed incomplete
 if(newValue == 7 || newValue == 3 || newValue == 4) {
	saveAndClose = false;
	alert('you cannot update from list');
 }
 callback(saveAndClose); 
}
