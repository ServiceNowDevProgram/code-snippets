🧹 Inactive User Cleanup — ServiceNow Scheduled Job
📌 Overview

This script automates daily cleanup of access and assignments for inactive users in ServiceNow.
It removes orphaned access, ensures task accountability, and sends an email summary upon completion.

✅ Features Included
🔹 Inactive Group Membership Cleanup

Searches User Group Member table (sys_user_grmember)
Identifies inactive users (excluding Web Service Access Only accounts)
Removes them from all associated groups
Logs each removal in system logs
Adds removal details to the summary email

🔹 Direct Role Revocation

Searches User Has Role table (sys_user_has_role)
Removes roles not inherited via group membership
Prevents unauthorized access after deactivation
Logs each role removed
Included in daily summary email

🔹 Task Ownership Cleanup

Searches Task table (task)
Finds active tasks assigned to inactive users
Clears the Assigned To field without triggering workflow
Adds work notes for audit traceability
Logs entries + email reporting
All actions skip users where: web_service_access_only = true

🛠 Script Placement & Configuration
Field	Value
Script Type	✅ Scheduled Script Execution
Location	Run this script section

Before using in your instance, update the following in script:

Line	Update Required
Line 56	Replace sender email in email.setFrom('xyz@service-now.com');
Line 44	Replace system property name in gs.getProperty('glide.xyz.admin.email.recipients');
🔍 System Property Required

Create or update the System Property to store email recipients:

Name (example)	Value (example)
glide.xyz.admin.email.recipients	admin@example.com,user@example.com

Supports single or comma-separated recipients ✅

✉️ Email Summary Includes

Users removed from groups
Direct roles removed
Active tasks unassigned
Timestamped logs for auditing

📝 Work Notes Added

For tasks reassigned:
System Administrator removed "Assigned to" value as the user is no longer active.

⚠️ Best Practices

Run in sub-prod first
Ensure proper backups/audit compliance
Schedule at low-traffic hours
Monitor logs initially for data impact

🧩 Extendability Ideas

You can easily modify:
Email template (HTML formatting)
Query filters for additional cleanup criteria
Logging to include sys_id values
Scheduling frequency (default recommended: Daily)

🧑‍💻 Maintainers

Feel free to update script name, System Property naming, and sender email for your organization.
Pull requests & suggestions welcome! 🙌
