This script helps to find out duplicate records in the table and returns an array of the duplicate records sys_id's.

In this example I have shown how to find out records in knowledge table.

All you need to do is use the call the function with the table and field values as shown below:
DupCheck("kb_knowledge", "short_description");
where "DupCheck" is the function, "kb_knowledge" is the table name and "short_description" is the field based on which your duplicates will be found.