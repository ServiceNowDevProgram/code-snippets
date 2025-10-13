# 🧹 ServiceNow Dormant User Cleanup

**ServiceNow Background Script** to automatically **deactivate users** who haven't logged in for a specified number of days.

## 🚀 Usage
1. Navigate to **System Definition → Scripts - Background**.  
2. Paste the script and execute:
   ```javascript
   deactivateDormantUsers(90);

**Script Explanation** 
   This script helps the admin team to identify the users who are inactive since the last "x" amount of days and make their profiles inactive. Along with the deactivation of user accounts, the group memberships of the user profiles also will be removed to prevent any mishappen.
