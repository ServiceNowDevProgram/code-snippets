## Purpose
Automatically reassigns tasks or incidents when the currently assigned user becomes inactive.
This ensures that no work item stays unattended due to user deactivation, termination, or role changes, maintaining operational continuity and SLA compliance.
## Tables Applicable:
Any task-based table, such as incident, problem, change_request, etc.
## Implementation Details
Table: sys_user
Trigger: Business Rule – After Update
Condition: current.active == false && previous.active == true
Purpose: Trigger logic only when a user becomes inactive.
