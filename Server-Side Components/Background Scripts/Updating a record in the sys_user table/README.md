# update a record in sys_user table

If we use the command below to update a record, it can lead to a problem.

grUser.get('grUser.get('62826bf03710200044e0bfc8bcbe5df9')');

If the record is not found in the table, the script will create a new one. 

To make sure we are updating and not inserting, it is better to wrap up the get method with an If statement.