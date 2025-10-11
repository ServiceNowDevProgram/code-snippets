# Get all users without email

Use the script in script.js file to get the list of all users in sys_user table who do not have an email.
This GlideRecord script can be used in multiple places. For example in background scripts.

### Did some optimization in the code
1. Used different variable name instead of gr to reference a GlideRecord object.
2. Used addActiveQuery() method to filter out just the active records.
3. Used getDisplayValue() method to push string values in the array instead of using dot notation.
4. Used self executing function to wrap the code in a function for reducing variable scoping issues.
