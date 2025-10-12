function ascOrder(tableName, field) {
	var tableGr = new GlideRecord(tableName);
	tableGr.addActiveQuery();
	tableGr.orderBy(field);
	tableGr.query();
}