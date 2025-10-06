Utility Script Include for managing user-group relationships in ServiceNow (sys_user_grmember table). 

It provides methods to:
Retrieve users in a group (getGroupMembers)
Retrieve groups a user belongs to (getUserGroups)
Add users to a group (addGroupMembers)
Remove users from a group (removeGroupMembers)

Supports both client and server-side operations (where applicable), ensures no duplicate group memberships, and simplifies bulk updates.

Ideal for use in server scripts, GlideAjax calls, reference qualifiers, etc to streamline group membership management.
