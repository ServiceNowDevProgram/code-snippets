This looping script traverses the User table from a certain point to get either one level of employees or all employees in the hierarchy underneath the logged-on user. There are two functions:
* getMyDirectReports: gets only users directly connected to the passed User sys_id
* getMyReports: gets all of the users underneath the passed User sys_id.

This solution has three components: one Global Business rule and two Dynamic Filters.
* Admins can use the script as a Reference Qualifier
* End Users can select the predefined filter in lists and reports (like with "One of My Assignments").

There is some recursion protection; the script checks to see if it has already collected the User before it tries to get their direct reports.

Recommended values for the Dynamic filters if you should choose to create them on your own:

Dynamic Filter Option (sys_filter_option_dynamic)
* Label: One of My Direct Reports
* Script: getMyDirectReports()
* Field Type: Reference
* Reference Table: User (sys_user)
* Order: 500
* Reference script: Business Rule: getMyDirectReports
* Available for filter: true
* Available for ref qual: true

Dynamic Filter Option (sys_filter_option_dynamic)
* Label: One of My Reports
* Script: getMyReports()
* Field Type: Reference
* Reference Table: User (sys_user)
* Order: 600
* Reference script: Business Rule: getMyDirectReports
* Available for filter: true
* Available for ref qual: true

The use of this script could have performance impacts for very large organizations. Use at your discretion.
