(function executeRule(current) {

	var _strCurrentTable = (current.getTableName() || '').toString();
	var _strCurrentURL   = (gs.action.getGlideURI() || '').toString();
	
	//only continue with list views in the Classic UI
	if (!_strCurrentURL.startsWith(_strCurrentTable + '_list.do')) {
		return;
	}
	
	var strEncodedQuery  = current.getEncodedQuery() || '';
	var numStartPosition = 
		strEncodedQuery.endsWith('ORDERBYDESCsys_created_on') || 
		strEncodedQuery.endsWith('ORDERBYsys_created_on')  ? 
			strEncodedQuery.length - 15 : 
			strEncodedQuery.length;
	
	if (strEncodedQuery.lastIndexOf('sys_created_on', numStartPosition) === -1) {
		current.addEncodedQuery(
			'sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()' +
			'@javascript:gs.endOfLast15Minutes()'
		);
			
		gs.addInfoMessage(
			'For performance reasons your query was extended by an expression to narrow ' +
			'down the result list to entries which have been created in the last 15 min. ' +
			'You can override this setting by using a dedicated query expression for the ' +
			'"Created on" field. But be careful: If the query result set is very large, ' +
			'it will cause a performance decrease!'
		);
	}

})(current);
