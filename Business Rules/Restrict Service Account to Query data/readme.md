//The business rule is on [incident] table and 'when to run' -> before + query
//The table could be replaced with other Servicenow tables according to the requirements.

var restrictedUserSysId = gs.getProperty('restricted.service.account.id');
//The script retrieves the sys_id of the restricted user from a system property named 'restricted.service.account.id' and type is String and value contains the sysid of user account. This property stores the unique sys_id of the service account user whose access is being limited.

if (gs.getUserID() === restrictedUserSysId):
//The code checks whether the currently logged-in user (gs.getUserID()) matches the restricted user’s sys_id. If the logged-in user is the restricted service account, the script proceeds to limit the records they can access.
Calculating the Date 10 Years Ago:

var tenYearsAgoFromToday = new GlideDateTime();
tenYearsAgoFromToday.addYears(-10);
//A new GlideDateTime object is created to get the current date and time. The method addYears(-10) is used to calculate the date exactly 10 years ago from today.
Limiting the Query to the Last 10 Years:

current.addQuery('sys_created_on', '>=', tenYearsAgoFromToday);
//The script adds a condition to the query, restricting the results to records where the sys_created_on date is greater than or equal to the calculated date (10 years ago). This effectively limits the records to those created in the last 10 years.
