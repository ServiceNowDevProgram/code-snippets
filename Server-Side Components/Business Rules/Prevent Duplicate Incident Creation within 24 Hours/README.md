Prevent Duplicate Incident Creation within 24 Hours 

1. Write a Business Rule - Before Insert
2. Select the Incident Table
3. Only run/execute for all the active incidents
4. By Gliding the Incident Table will get the caller_id, short_description for checking the current caller and text provided for the short description
5. Querying the Incident Table as created within 24 Hours and excluding the closed incidents
6. Stop insert and show an error message
7. Prevent Incident record creation
