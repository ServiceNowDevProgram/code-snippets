// Business Rule: 'Before' Update on any table that will have a integer field you want to keep in sync
(function executeRule(current, previous /*null when async*/) {
  var tableName = current.getTableName()
 
  //This array will contain the list of records with their current value before rearranging them.
  var recordList = [];

  var tableRecord = new GlideRecord(tableName);
  tableRecord.addNotNullQuery({{insert name of integer field you want to sync}}); //Going to exclude records that don't have a value
  tableRecord.addQuery('sys_id', '!=', current.sys_id); //Need to exclude the current record
  tableRecord.orderBy({{insert name of integer field you want to sync}});
  tableRecord.query();

  while(tableRecord.next()) {
    recordList.push(tableRecord.sys_id.toString());
  }

  //Condition check to make sure the record has a value to add to the arry in the correct spot, otherwise no reason to splice the array
  if (current.{{insert name of integer field you want to sync}} != '') {
    var index = current.{{insert name of integer field you want to sync}} - 1; //Making this one less so it will get added first
      recordList.splice(index, 0, current.sys_id.toString()); //This will insert our record into the correct position it needs to be in the list
  }

  //Reassigning the integer sequentially
  for (var i = 0; i < recordList.length; i++) {
    if(recordList[i] == current.sys_id.toString()) {
      current.{{insert name of integer field you want to sync}} = i + 1;
    } else {
        var updatedTableRecord = new GlideRecord(tableName);
        if (updatedTableRecord.get(recordList[i])) {
          updatedTableRecord.{{insert name of integer field you want to sync}} = i + 1;
          updatedTableRecord.setWorkflow(false); //Setting the workflow false since we dont want the flow to get triggered since all we are doing is updating the integer field
          updatedTableRecord.update()
        }
    }


})(current, previous);
