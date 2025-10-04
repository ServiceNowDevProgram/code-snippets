This Business Rule script is used to make an async call to the REST integration (Eg:Salesforce from ServiceNow). 
After making all the REST service setup, we can call this BR script and is used after inserting a new user from ServiceNow. 
As soon as we create a new user in sys_user table, we call this BR and make a REST call to the target system (Eg:SalesForce) and create an entry over there.
