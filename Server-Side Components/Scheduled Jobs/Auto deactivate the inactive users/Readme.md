Purpose
  This scheduled job automatically identifies inactive users in the ServiceNow instance and deactivates their accounts if they have not logged in for a specified period (default: 3 months).
It ensures compliance, reduces clutter, and maintains security by removing stale user accounts.

Key Features
  Runs automatically once per month.
  Identifies users who have been inactive for a defined number of months.
  Supports dry-run testing to safely validate before applying changes.
  Deactivates inactive users automatically.
  Sends email notifications to both users and their managers upon deactivation.
  Logs all activities in the system log for auditing purposes.

Script Workflow

1. Calculate Cutoff Date
The script calculates a cutoff date by subtracting the configured number of months (default: 3) from the current date.
Any user created before this date and who has not logged in since is considered inactive.

2. Query Eligible Users
The script searches the sys_user table for records meeting these conditions:
active = true
sys_created_on <= cutoffDate
last_login_time <= cutoffDate

3. Process Each User
For every matching user, the script:
Logs user details (name, email, last login, manager).
Deactivates the account (if DRY_RUN is false).
Sends notification emails.

4. Send Notification to User
Sends a plain-text email to the user informing them that their account was deactivated due to inactivity.
Includes instructions on how to request reactivation.

5. Send Notification to Manager
If the user has a manager assigned, an additional email is sent to the manager.
The email contains the user’s details and the date of last login for awareness.

6. Log Summary
At the end of execution, the script logs:
Total users found
Total users deactivated
Status of the run (Dry Run or Actual)
