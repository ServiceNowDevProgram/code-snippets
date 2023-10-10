
# Prevent adding user to group

**Use case** : Whenever any user is getting added to any group, if the group manager is inactive then it should prevent the adding of user to the group

*info* : This method is to achieve the above use-case just with business rule

**Solution** : Create a `Before` business rule on `sys_user_grmember` table with `insert` checkbox checked. Follow the script present in [Script.js](https://github.com/ServiceNowDevProgram/code-snippets/blob/main/Business%20Rules/Prevent%20adding%20user%20to%20group%20if%20manager%20is%20inactive/Script.js)

