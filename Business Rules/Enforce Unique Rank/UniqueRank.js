(function executeRule(current, previous /*null when async*/) {
	// Prevent submission if a record already exists with this rank
	var grCheckRank = new GlideRecord(current.getTableName()); 
	grCheckRank.addQuery('rank', current.rank); 
	grCheckRank.query(); 
	if (grCheckRank.hasNext()) {
		current.setAbortAction(true);
		gs.addErrorMessage('Another record exists with this rank. Set the rank to a value above or below ' + current.rank + '.'); 
	}
})(current, previous);