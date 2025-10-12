This script identifies active users in ServiceNow who have no group memberships and no roles assigned.
It queries the sys_user table for all active users, then checks each user against the sys_user_grmember table (groups) and the sys_user_has_role table (roles).
If a user has no associated groups and no assigned roles, their username is added to a list called orphanedUsers.
Finally, the script prints the list, which can be used for user cleanup, security audits, or compliance purposes to ensure proper user management.
