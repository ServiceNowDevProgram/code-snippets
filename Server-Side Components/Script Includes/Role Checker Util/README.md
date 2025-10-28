# Script incude with 4 functions to check if users have a certain role.
Should work server side as well as client side with the right prameters (with some caviats for the 4th function).
Pay attention to the defined sysparm names in the script if used on client side.

## hasRoleID
Checks if a user has a given role based on user and role sys_id passed in
Returns a boolean value of true or false depending on whether or not the user has the role
* @param1 - roleID: must be the sys_id of the role to check
* @param2 -userID: must be the sys_id of the user to check
* @returns: true/false

## hasRoleEmail
Checks if a user has a given role based on sys_id of role and email address of user passed in
Only makes sense if user has an account in ServiceNow, otherwise it won't have a role anyway :)
Returns a boolean value of true or false depending on whether or not the user has the role
* @param1 - roleID: must be the sys_id of the role to check
* @param2 - email: must be an email address in string format
* @returns: true/false

## checkArray
Checks if an array of users have a given role based on the role's name (note: not sys_id!)
* @param1 - roleName: must be the name of the role to check as string
* @param2 - array: must be an array that contains sys_ids, email addresses or a combination of both
* @returns: - a comma separated list (stringified array) of names (can be changed) of those users who have the provided role. You can remove stringification to return an array (for server side scripts).

## checkArrayGetObjects
Checks if an array of users have a given role based on the role's name
* @roleName: must be name of the role to check as string
* @array: must be an array that contains sys_ids, email addresses or a combination of both.
* @returns: an array of objects with some details of the users who have the provided role. You can extend the object per your requirements, by default it returns sys_id, name and email.

NOTE: if you want to use this function in GlideAjax, you should stringify the array here, and convert it back (if you want) on the client side!
