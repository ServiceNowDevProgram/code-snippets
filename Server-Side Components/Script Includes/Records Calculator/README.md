
#  Records Calculator
Provides functions to easily calculate values across multiple records
This class provides shortcut functions that works in both Client and Server sides.

## Note: 
It is part of a case management application built with App Engine. Contact me for more information: 
 
 # Usage

When you copy this script into your scoped application, make sure to set the value of "Accessible from" in the Script Include form to "All application scopes". Otherwise you will get this error: "Illegal access to private script include Calculator in scope <script scope> being called from scope <your scope>", 

```javascript

var last_login = new x_your_cope.Calculator().getMax('sys_user', 'last_login', 'user_name!=admin');
gs.info ( "Last time a user logged in: " + last_login) ;


/* 
 * With a table of business owners with a column 'ownership_percentage' we 
 * want to calculate the sum of all ownership percentage and use that in a
 * business rule to insure it does not exceed 100%
 */
var tableName = "x_snc_psd_pas_owner";
var fieldName = 'ownership_percentage';
var query = 'business_entity=bb5cb5811b8f30107d4c2171604bcb78';

var sum = new x_snc_ecms.Calculator().getSum(tableName, 'ownership_percentage', query);
gs.info ( "Sum of ownerships = " + sum) ;
```