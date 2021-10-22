# Create incident copy

**Use case** : Whenever a new incident is created in servicenow production instance, a copy of that incident should be created in backup instance.

*info* : This method is to achieve the above use-case just with business rule and without creating a record in sys_rest_message table.

**Solution** : Create a `After` business rule on incident table with `insert` checkbox checked. Follow the script present in [script.js](script.js) 
