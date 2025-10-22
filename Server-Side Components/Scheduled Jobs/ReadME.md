Purpose of the Script:
This script automatically finds and cleans up user accounts that meet all of the following conditions:
* The user is inactive
* The user is locked out
* They haven’t been updated in the last 90 days
  
For such users, the script:
* Removes them from all groups
* Deletes all their roles
* Logs everything in the system logs

Explanation:
1. Set a time threshold (90 days):
    * It calculates the date 90 days ago from today.
2. Find target users:
    * Searches the sys_user table for users who:
        * Are marked as inactive
        * Are locked out
        * Have not been updated since 90 days ago
3. Loop through each matching user:
    * Logs the username being cleaned up
4. Remove user from all groups:
    * Searches the sys_user_grmember table (group memberships)
    * Deletes all group entries related to the user
5. Remove all roles:
    * Searches the sys_user_has_role table
    * Deletes all roles assigned to the user
6. Logs the total number of users processed.
7. 
