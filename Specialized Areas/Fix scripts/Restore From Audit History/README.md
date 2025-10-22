This script retrieves the most recent old value of a specified field from the audit history of a given record in ServiceNow. 
It queries the sys_audit table, filtering by the table name, field name, and document key (record ID). 
The results are ordered by the creation date in descending order, and only the latest entry is returned.

Pre-requisite
Make Sure columns of sys_audit table - (tablename, fieldname & documentkey) are indexed for better query result.

Usage Example
To use the getAuditHistoryData function, you can retrieve the previous state of an incident and update it accordingly. Here's how you might implement it:
Retrieve Previous State: Use the function to get the last state before it was changed to "canceled."
Update the Record: Set the incident state back to the retrieved value.
