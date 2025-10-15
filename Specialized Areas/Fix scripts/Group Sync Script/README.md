ServiceNow Fix Script - Group Role Synchronization
Overview

This Fix Script automatically validates and synchronizes user roles with their assigned groups in ServiceNow.
It checks if every user in the target groups has all the roles assigned to that group.
If any roles are missing, the script re-adds the user to the group, ensuring all inherited roles are correctly applied.

How It Works

Identify Groups
The script starts by reading the list of sys_ids of the target groups.

Fetch Group Roles
It retrieves all the roles assigned to each group from the sys_group_has_role table.

Check Each User
For each user in the group (sys_user_grmember), it fetches their assigned roles from sys_user_has_role.

Detect Missing Roles
Compares the user’s roles with the group’s roles.
If any group role is missing for a user:

Removes the user from the group.

Re-adds the user to the group, triggering ServiceNow’s role inheritance process.

Logs
The script logs all actions using gs.info() for easy monitoring in the system logs.
