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
    projectList.push(tableRecord.sys_id.toString());
  }





})(current, previous);
