var UserCriteriaUtil = function(userSysId) {
	
	//returns all user criteria sys ids which evaluated to true for the current user
	var _list = function() {
		if (!userSysId) userSysId = gs.getUserID();
		return new sn_uc.UserCriteriaLoader.getAllUserCriteria(userSysId);
	};
	
	//checks if a specific user criteria evaluated to true for the current user
	var match = function(userCriteriaSysIds) {
		var listResult = _list();
		var userCritList = userCriteriaSysIds.split(",");
		for (var i = 0; i < userCritList.length; i++) {
			if (listResult.indexOf(userCritList[i]) >= 0) return true;
		}
		return false;
	};
	
	//return public functions
	return { match: match };
};