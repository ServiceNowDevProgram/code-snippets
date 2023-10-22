This business rule can be used to validate the email address when 
we are using the OOB 'Import' feature from the list context menu to upload some data from spreadsheet into the table.


Business Rule will have the below configuration:
When to run: before insert + update
Filter condition: Email[u_email_address] is not empty

In the advance >script section paste the code, it will run when we will import any spreadsheet 
in the table(record will insert/update)
