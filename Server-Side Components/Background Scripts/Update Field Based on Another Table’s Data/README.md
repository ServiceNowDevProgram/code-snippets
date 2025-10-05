Update incidents with the department of their caller
Loops through every user in the sys_user table. For each user, finds all incidents where they are the caller (caller_id matches sys_id of the user).
For each matching incident:
Copies the user's department value.Sets it on the incident's custom field u_department.

Use Case Example:

Let’s say you want each incident record to store the caller’s department, but this info is only on the user profile.
This script pulls it from the user and updates all related incident records.
