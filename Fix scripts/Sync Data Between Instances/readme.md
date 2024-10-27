The script leverages the ServiceNow REST API to retrieve records from a specified table on the source instance, then transmits them to the target instance for insertion.

As an example, it is set up to sync active user records, but it can be easily modified for any other table and filter criteria.


Usage:

The script is configured with the following parameters:

table: Specifies the name of the table to sync (Example is sys_user).

query: A GlideRecord query string to filter the records to be synchronized

targetInstance: The ServiceNow instance to which data will be sent.

user and password: Credentials for authenticating with the target instance.
