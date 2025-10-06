This script is used in ServiceNow to remove the admin role from all users except the one running the script.
It's typically used during a security audit or access cleanup to ensure that only authorized users retain administrative access. 
By targeting the sys_user_has_role table and checking for the admin role, it deletes role assignments for all users except the current user, helping reduce the risk of 
unauthorized changes or privilege misuse in the system.
