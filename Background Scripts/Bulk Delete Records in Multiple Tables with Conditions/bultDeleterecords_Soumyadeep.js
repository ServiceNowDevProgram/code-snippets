function bulkDelete() {

    var target = {
        'change_request': 'priority=3^impact=2',   //conditions for query for the records to be deleted
        'incident': 'state=7^urgency=3'
    };

    for (var table in target) {
        if (target.hasOwnProperty(table)) {
            var getRecord = new GlideRecord(table);
            getRecord.addEncodedQuery(target[table]);
            getRecord.query();
            var count = 0;
            while (getRecord.next()) {

                getRecord.deleteRecord();
                count++;
            }
            gs.print("Deleted " + count + " record(s) from " + table + " with query: " + target[table]);  //printing count of records
        }
    }
}
bulkDelete();   //exceuting fuvntion
