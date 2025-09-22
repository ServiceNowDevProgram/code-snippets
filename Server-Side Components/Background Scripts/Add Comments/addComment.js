function addComments(tableName,recSysId, userName, fieldName){
var rec = new GlideRecord(tableName);
if(rec.get(recSysId)){
  rec[fieldName].setJournalEntry('This is my comment',userName);
  rec.update();
}
}

addComments(tableName,recSysId,userName,fieldName);
