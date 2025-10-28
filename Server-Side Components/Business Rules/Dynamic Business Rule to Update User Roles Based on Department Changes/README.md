**Purpose**

This business rule automatically updates user roles in ServiceNow whenever a user's department changes. By ensuring that users have the appropriate roles based on their current department, the rule helps maintain data integrity and enhances access control within the organization.



**Complete Business Rule Configuration**

**Name**: "Update User Roles Based on Department Changes"

**Table**: sys_user

**When**: Before

**Insert**: Checked

**Update**: Checked


**Condition**:

**javascript**

'''current.department.changes();'''
