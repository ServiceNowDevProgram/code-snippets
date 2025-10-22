function getGroupCountGQ(table, groupBy, min) {
    var gqCount = new GlideQuery(table)
		.aggregate('count', groupBy)
		.whereNotNull(groupBy)
		.groupBy(groupBy)
		.having('count', groupBy, '>=', min)
		.select()
		.toArray(10);
    return gqCount;
}