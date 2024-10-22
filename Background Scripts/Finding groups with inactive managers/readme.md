This script is designed to identify all active user groups in ServiceNow where:
	The group has no manager assigned, OR
	The assigned manager is inactive.
This script helps administrators easily locate and notify the management about this inconsistancy.

Administrators can also use this script in their fix scripts and add a mailing functionality to the group members by calling an event to trigger the mail.

All you need to do is use the call the function : "Checkgrps()" and it will check for the groups with inactive or no managers and stores the names of the groups in an array "arr".