This looping script traverses the User table from a certain point to get either one level of employees or all employees in the hierarchy underneath the logged on user. There are two functions:
* getMyDirectReports: gets only users directly connected to the User sys_id that is passed in
* getMyReports: gets all of the users underneath the the User sys_id that is passed in

This script is implemented as a Global Business rule and two Dynamic Filter records.
* Admins can use the script as a Reference Qualifier
* End Users can select the predefined filter in lists and reports (just like they can with "One of My Assignments").

There is some recursion protection, in that the script check to see if we've already collected the User before we go try to get their direct reports.

I have also included an XML file that will create the business rule and two dynamic filters for you.

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

Use of this script could have performance impacts for very large organizations. Use at your own discretion.
