This business rule is being used to update the live_profile record for a user if their first or last name changes. 
When a sys_user record is updated it runs a query against the live_profile table to match the document field with the sys ID of the user and then updates the name
field of the live_profile record with the name value from the sys_user record.	
