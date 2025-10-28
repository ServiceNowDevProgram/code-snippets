## Unique Record

Create a before insert Business rule to check is any existing record already available in a table , then abort the process to create a new record.

**Use Case**

This is script to used to validate and ensure not to create create duplicate entries/records in any given table based on the mention criteria in the script, in our example we have **cmdb_ci_server** and using **serial_number** as a primary field to validate if there is any exisitng record on the same serial number
