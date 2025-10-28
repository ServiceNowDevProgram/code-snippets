# Use Case <br/>
As per OOB, the "Locked out" field will be set to true if Active field set to false. But, the vice-versa case is not implemented. For example, If Employee is on long leave like maternity leave etc., then the user account will be set inactive temporarily and reactivated upon his/arrival to office. This causes, user account to be Active and Locked out as true which makes the login to fail
# Business Rule <br/>
Name: Update Locked Out field<br/>
Table: User [sys_user] <br/>
Advanced: true <br /><br/>

**When to run section:**<br/>
When: Before <br/>
Insert: true <br/>
Update: true <br/>
Filer Conditions: Active -- Changes to -- true [AND] Locked out -- is -- true<br/><br/>
![image](https://github.com/user-attachments/assets/835f6d9c-8d60-4b1a-9159-bda5576fe088)

**Advanced section:**<br/>
Script:<br/>
(function executeRule(current, previous ) {

	current.locked_out = !current.active; 

})(current, previous);

![image](https://github.com/user-attachments/assets/0fd67e77-38f3-449d-9647-047406f8d23e)


