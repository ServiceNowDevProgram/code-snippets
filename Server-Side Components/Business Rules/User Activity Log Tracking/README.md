# Overview
This script logs specific user actions (e.g: record updates and approvals) in ServiceNow into a custom table `u_user_activity_log`. 

This provides audit capabilities and allowing developers to track user actions for compliance or analytics.

# How It Works
The script is triggered by a Business Rule on record updates and checks for changes in specified critical fields (e.g., `state`, `approval`). When a change occurs, it logs relevant details in the `u_user_activity_log` table, including:
- `u_user`: User ID
- `u_action`: Type of action performed
- `u_record_id`: ID of the updated record
- `u_record_table`: Name of the table where the change occurred
- `u_description`: Brief description of the action

# Implementation
- Create Custom Table: Ensure `u_user_activity_log` table exists with fields like `u_user`, `u_action`, `u_record_id`, `u_record_table`, `u_description`, etc.
- Configure Business Rule: Set the Business Rule to run on update and add conditions for monitoring fields (`state`, `approval`).