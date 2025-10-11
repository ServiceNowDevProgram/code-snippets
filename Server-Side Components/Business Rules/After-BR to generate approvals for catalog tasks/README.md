This code snippet will help you to generate approvals for catalog tasks via scripting. You just need to create an after insert BR and put this script there.
This script can be used in a workflow run script as well and you can modify the script a little bit and use it for other tables as well. 

Fun fact: When you are playing with Document Id type field. You need to keep a field as dependent for the document ID like we have 'Source table' for 'Approving' field to put the correct table name there and with the help of that you can easily set the document ID field.

For e.g. dependent field name is u_table_name, so your script can be something like below:

- obj.u_table_name = 'Name of the table for your document ID type field';
- obj.u_document_id = 'Sys_id of the correct record from above table';
- obj.update();

where 'obj' is an object of the record you are referring to.
