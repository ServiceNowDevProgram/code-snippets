# Group Membership Utility

The **Group Membership Utility** is a ServiceNow server-side tool designed to streamline the management of user membership in assignment groups. It provides administrators with two UI actions on the Assignment Group table to add or remove themselves from a group, ensuring efficient group membership management. Super helpful when doing group membership testing.

## Challenge

Managing assignment group memberships manually can be time-consuming and frustrating when doing group change related testings.

## Features

- **Add Me**: Adds the current user to the selected assignment group, ensuring quick inclusion.
- **Remove Me**: Removes the current user from the selected assignment group, simplifying group updates.
- **Admin-Only Visibility**: Both actions are restricted to users with administrative privileges i.e admin user role, ensuring controlled access.

## Functionality

The Group Membership Utility provides the following capabilities:
- Detects the current user's membership status in the selected group.
- Dynamically enables or disables the **Add Me** and **Remove Me** actions based on the user's membership.
- Ensures visibility of these actions only for users with administrative privileges.

## Visibility

Add below condition script for the "Add Me" UI action 
```javascript
gs.hasRole('admin') && !gs.getUser().isMemberOf(current.sys_id);
```
Add below condition script for the "Remove Me" UI action 
```javascript
gs.hasRole('admin') && gs.getUser().isMemberOf(current.sys_id);
```

## Usage Instructions

1. Navigate to the Assignment Group table.
2. Select a group.
3. Use the **Add Me** button to add yourself to the group if you're not already a member.
4. Use the **Remove Me** button to remove yourself from the group if you're already a member.


