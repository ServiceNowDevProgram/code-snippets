var tableName = 'db_image';

var gru = new GlideRecordUtil();

var parentTables = gru.getTables(tableName);
gs.print("Parent tables: " + parentTables);

var gr = new GlideRecord(tableName);
gr.setlimit(1);
gr.query();

if(gr.next()){ 
	var fieldNames = gru.getFields(gr);
	gs.print('Fields\t\tBase table');
    for (var i = 0; i < fieldNames.length; i++) {
		gs.print(fieldNames[i] + "\t\t" + gr[fieldNames[i]].getBaseTableName()); 
    }
}

