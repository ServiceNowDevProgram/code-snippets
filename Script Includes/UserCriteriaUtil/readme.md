# UserCriteriaUtil
This ScriptInclude helps to evaluate if a certain UserCriteria did match with a User. It doesn't use the typical `Class.create`, instead it is a simple javascript function.

## Example Script
```javascript
var myUserCriteriaSysId = gs.getProperty("<my_user_criteria_sys_id>");
//Will match against the current user
UserCriteriaUtil().match(myUserCriteriaSysId);
//Will match against a specific user
UserCriteriaUtil("<user_sys_id>").match(myUserCriteriaSysId);
```