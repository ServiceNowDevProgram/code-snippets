Identification and Reconciliation rule is used to identify the true source of data inserted/updated
into a table from different sources.

Here we will see how we can use the given script in business rule, scheduled job, etc to run the IRE on any payload 
whenever required.
One of the use case is: Suppose we have a payload from Rest message and it is creating/updating records in Computer table.
So, we will use the payload and pass it into the IRE to run the identification and reconciliation rule.


className - It will be name of the table on which the rule needs to be implemented
Under the values, we need to pass the backend name of the fields and field value
Note: name, serial_number, u_glide_date and asset_tag are the field's backend name in the 
Computer[cmdb_ci_computer] table.

ServiceNow is the 'Data Source' which we have defined in the reconciliation rules for the table
[cmdb_ci_computer]. It will follow the priority, field that have been
selected as part of the reconciliation rule. Then it will automatically insert/update based on the defined 
identification/reconciliation rule on the table[cmdb_ci_computer].

The table and their fields can be changed as per the end user's requirement and this piece will help to
maintain the integrity of CMDB and avoid duplicate records and maintain the true source of data.
