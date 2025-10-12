function ascOrder(tableName, field) {
	var tableGr = new GlideRecord(tableName);
	tableGr.addActiveQuery();
	tableGr.orderByDesc(field);
	tableGr.query();
}