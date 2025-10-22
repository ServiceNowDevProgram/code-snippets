
# Remove all roles from inactive user

Code Snippet : Remove all roles from an inactive user 
When a user in an instance is inactive, it's a good practice to remove all roles assigned to that user. Following piece of code helps to remove all the roles from the inactive user.
~~~ 
var gr = new GlideRecord('sys_user_has_role');
gr.addEncodedQuery('user.active=false');
gr.query();
gr.deleteMultiple();
~~~
This piece of code can be used in scheduled jobs under scheduled script execution tab. This can be run weekly once to check the last one week inactive users and remove them from all assigned roles (if exist).

