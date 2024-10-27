/*Use the following to determine if a user passes an array of user criterias
/*@param userID - String of a sys_user sys_id
/*@param userCriteria - Array of user_criteria sys_ids to check again
/*@return Boolean
*/

var userID = "",
    userCriteria = [];

var result = sn_uc.UserCriteriaLoader.userMatches(userID , userCriteria);
