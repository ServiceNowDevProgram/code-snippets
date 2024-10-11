Using this script present in "Capturing a record in to the current update set using background script.js" file we can capture a record from a table (eg; groups, approval configurations) to the current update set

We have to provide the table name and the sys_id of the record properly as mentioned in the script.

When using the GlideUpdateManager2 API, a record is created in the sys_update_version table, and an XML file is created under the customer update folder because it is a part of the mechanism that allows adding records to an update set.

GlideUpdateManager2() will only work in global scope. If you try to create an update sect in scoped application and try to use GlideUpdateManager2 API then it will capture the update in the crrent scoped update set but the update will be in global scope. So there will be conflict while moving the update set.

Note: GlideUpdateManager2 API is undocumented API.
