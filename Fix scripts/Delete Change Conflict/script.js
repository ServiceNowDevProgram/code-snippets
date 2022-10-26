// delete conflicts for any change and update conflict status to 'No Conflict'
var changeRec = new GlideRecord('change_request');
changeRec.addQuery('conflict_status', 'Conflict');
changeRec.addQuery('number', 'CHG0000014');  // replace your change number
//changeRec.addQuery('sys_id', 'sys_id of change request record');  // can be used if query is based on sys_id of Change
changeRec.query();
if (changeRec.next()) {
    var chg = new ChangeConflictHandler();
    // delete conflict records for the change from Conflict table
    var output = chg.deleteConflictsByChangeId(changeRec.getUniqueValue()); // or pass any change Record sys_id
    changeRec.conflict_status = 'No Conflict';  //optional 
    changeRec.update(); // optional
}
