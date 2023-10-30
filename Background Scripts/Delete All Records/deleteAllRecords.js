function deleteAllRecords(tableName) {
    var targetTableGR = new GlideRecord(tableName);
    targetTableGR.query();
    targetTableGR.deleteMultiple();
}

deleteAllRecords( < tableName > );
