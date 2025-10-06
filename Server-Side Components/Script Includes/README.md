# Department Filter – Show Only Users from Same Department

This Script Include is configured to filter users based on the department of the currently logged-in user.

It can be used in a **Reference Qualifier** to ensure that the Caller (or any user reference field) displays only users belonging to the same department as the logged-in user.

### 📘 Table
- `sys_user` (to fetch users)
- Used for reference fields such as `caller_id` in `incident`

### ⚙️ Script Include Overview
- Name: `getSameDeptUsers`
- Function: `getSameDept()`
- Logic: Fetches all users whose `department` matches that of the current logged-in user.
