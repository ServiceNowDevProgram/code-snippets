This looping script traverses the User table from a certain point to get either one level of employees or all employees in the hierarchy underneath the logged-on user. There are two functions:
1. **getMyDirectReports**: gets only users directly reporting to the logged on user
1. **getMyReports**: gets all users reporting to the logged on user

This solution has three components: one Global Business rule and two Dynamic Filters.
* Admins can use the script as a Reference Qualifier
* End Users can select the predefined filter in lists and reports (like with "One of My Assignments").

There is some recursion protection; the script checks to see if it has already collected the User before it tries to get their direct reports.

**IMPORTANT: The use of this script could have performance impacts for very large organizations. Use at your discretion.**

**Business Rule**

| Field | Value |
|---|---|
| Name | getMyDirectReports |
| Table | Global [global] |
| Advanced | true |
| Script | <em>see [getMyDirectReports.js](getMyDirectReports.js) in this folder</em> |

**Dynamic Filter Option (sys_filter_option_dynamic)**

| Field | Value |
|---|---|
| Label | One of My Direct Reports |
| Script | getMyDirectReports() |
| Field type | Reference |
| Reference Table | User [sys_user] |
| Order | 500 |
| Reference script | Business Rule: getMyDirectReports |
| Available for filter | true |
| Available for ref qual | true |

| Field | Value |
|---|---|
| Label | One of My Reports |
| Script | getMyReports() |
| Field type | Reference |
| Reference Table | User [sys_user] |
| Order | 600 |
| Reference script | Business Rule: getMyDirectReports |
| Available for filter | true |
| Available for ref qual | true |
