To mitigate the Security Vulnerability caused by simple list widget, It is recommended to add gs.isLoggenIn() condition in Script field of ACL with empty checks. And It is good to track the ACLs with empty checks regularly.

Use this package to run a scheduled job weely, which will send a notification which contains ACL name and sys_id which doesn't have any Checks like Roles, Conditions and Script. Follow the screenshots and steps below or use the update set XML provided.

Steps:

1. Create a group called ServiceNow Admins (You can import the XML provided in this package).

2. Import the update set provided in this package and commit.