**Script to Add a User to list of User Groups Where They Are Not Already a Member**

Purpose: we often recive requests add a single group member to multiple groups. that's a manual task. this script makes it very simple.

- **The first GlideRecord('sys_user_group')**: Creates a GlideRecord instance to query the `sys_user_group` table.
   
- **addEncodedQuery('')**: Add the required list of groups here, by copying filter from list of groups.

- We use while loop to loop through list of groups.

- **The second GlideRecord('sys_user_grmember')**: For each group, creates a new GlideRecord instance to query the `sys_user_grmember` table (user-group memberships).

- **addQuery('group', rec.sys_id)**: Filters the `sys_user_grmember` records by the current group’s `sys_id`.

- **addQuery('user', '7279f455939e71944c77b6b5fbba1033')**: Filters the records for the specific user's `sys_id` ( this is sample sys id. replace with the actual `sys_id` of the user).
