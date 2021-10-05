(function executeRule(current, previous /*null when async*/) {

	reRank('rank', current.rank);

})(current, previous);

function reRank(rank, currentRank) {
	var grRank = new GlideRecord(current.getTableName());
	grRank.addNotNullQuery(rank);
	grRank.addQuery(rank, '>=', currentRank);
	grRank.orderBy(rank);
	grRank.query();

	while (grRank.next()) {
		grRank.autoSysFields(false);
		grRank.setWorkflow(false);
		grRank.rank = currentRank;
		grRank.update();
		currentRank += 10;
	}
}